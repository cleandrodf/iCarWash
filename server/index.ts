import "dotenv/config";
import crypto from "node:crypto";
import path from "node:path";
import cors from "cors";
import express from "express";
import { z } from "zod";
import type { CreateBookingInput, CreateBookingResponse, ServiceMode } from "../shared/contracts";
import { hasDatabaseConnection } from "./db";
import { getDemoPartners } from "./demo-data";
import { createBookingInDatabase, getNearbyPartnersFromDatabase } from "./repository";
import { isValidCoordinates } from "./services/distance";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const appOrigin = process.env.APP_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: appOrigin }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", async (_request, response) => {
  response.json({
    status: "ok",
    databaseConfigured: hasDatabaseConnection(),
    environment: process.env.NODE_ENV ?? "development",
  });
});

app.get("/api/partners/nearby", async (request, response) => {
  const latitude = Number(request.query.lat ?? -15.793889);
  const longitude = Number(request.query.lng ?? -47.882778);
  const mode = request.query.mode as ServiceMode | undefined;
  const origin = { latitude, longitude };

  if (!isValidCoordinates(origin)) {
    response.status(400).json({ message: "Coordenadas inválidas." });
    return;
  }

  if (mode && mode !== "onsite" && mode !== "mobile") {
    response.status(400).json({ message: "Modalidade inválida." });
    return;
  }

  if (hasDatabaseConnection()) {
    try {
      const partners = await getNearbyPartnersFromDatabase(origin, mode);
      response.json({ origin, source: "database", partners });
      return;
    } catch (error) {
      console.error("[partners/nearby] Falha ao consultar o banco; usando demonstração.", error);
    }
  }

  response.json({ origin, source: "demo", partners: getDemoPartners(origin, mode) });
});

const bookingSchema = z
  .object({
    partnerId: z.string().min(1),
    partnerServiceId: z.string().min(1),
    slotId: z.string().min(1),
    customerName: z.string().trim().min(3).max(160),
    customerPhone: z.string().trim().min(8).max(32),
    vehicleDescription: z.string().trim().min(2).max(180),
    mode: z.enum(["onsite", "mobile"]),
    serviceAddress: z.string().trim().max(280).optional(),
    notes: z.string().trim().max(800).optional(),
  })
  .superRefine((value, context) => {
    if (value.mode === "mobile" && !value.serviceAddress) {
      context.addIssue({
        code: "custom",
        path: ["serviceAddress"],
        message: "Informe o endereço para atendimento móvel.",
      });
    }
  });

app.post("/api/bookings", async (request, response) => {
  const parsed = bookingSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ message: "Revise os dados do agendamento.", issues: parsed.error.issues });
    return;
  }

  try {
    let result: CreateBookingResponse;

    if (hasDatabaseConnection()) {
      result = await createBookingInDatabase(parsed.data as CreateBookingInput);
    } else {
      result = {
        bookingId: `demo-${crypto.randomUUID()}`,
        status: "pending_partner",
        message: "Solicitação simulada com sucesso. Configure o Neon para persistir agendamentos.",
      };
    }

    response.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível criar o agendamento.";
    response.status(409).json({ message });
  }
});

if (process.env.NODE_ENV === "production") {
  const clientDist = path.resolve(process.cwd(), "dist");
  app.use(express.static(clientDist));
  app.get("*", (_request, response) => response.sendFile(path.join(clientDist, "index.html")));
}

app.listen(port, "0.0.0.0", () => {
  console.log(`API disponível em http://localhost:${port}`);
  console.log(hasDatabaseConnection() ? "PostgreSQL configurado." : "Modo demonstração: configure DATABASE_URL para persistência.");
});
