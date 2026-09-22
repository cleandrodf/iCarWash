import "dotenv/config";
import pg from "pg";
import type { CreateBookingResponse, NearbyPartnersResponse } from "../shared/contracts";

const apiBase = process.env.API_BASE_URL ?? "http://127.0.0.1:3001";
const nearbyResponse = await fetch(
  `${apiBase}/api/partners/nearby?lat=-15.793889&lng=-47.882778&mode=onsite`,
);

if (!nearbyResponse.ok) throw new Error("A busca por parceiros falhou.");
const nearby = (await nearbyResponse.json()) as NearbyPartnersResponse;
if (nearby.source !== "database") throw new Error("A API não está usando o banco remoto.");

const partner = nearby.partners[0];
const service = partner?.services[0];
const slot = partner?.slots[0];
if (!partner || !service || !slot) throw new Error("Não há parceiro, serviço e horário para o teste.");

const bookingResponse = await fetch(`${apiBase}/api/bookings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    partnerId: partner.id,
    partnerServiceId: service.id,
    slotId: slot.id,
    customerName: "Teste Automatizado",
    customerPhone: "61999990000",
    vehicleDescription: "Veículo de validação",
    mode: service.mode,
    serviceAddress: service.mode === "mobile" ? "Endereço fictício de teste" : undefined,
    notes: "Registro temporário criado pelo teste de fumaça.",
  }),
});

if (!bookingResponse.ok) {
  throw new Error(`A criação do agendamento falhou: ${await bookingResponse.text()}`);
}

const booking = (await bookingResponse.json()) as CreateBookingResponse;
if (booking.status !== "pending_partner") throw new Error("O estado inicial do agendamento está incorreto.");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL não configurada para limpeza do teste.");

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const client = await pool.connect();

try {
  await client.query("BEGIN");
  await client.query("DELETE FROM bookings WHERE id = $1", [booking.bookingId]);
  await client.query(
    "UPDATE availability_slots SET reserved_count = GREATEST(0, reserved_count - 1) WHERE id = $1",
    [slot.id],
  );
  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}

console.log(`Smoke test concluído no PostgreSQL remoto (${partner.name}).`);
