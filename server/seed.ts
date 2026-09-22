import "dotenv/config";
import { addHours, startOfHour } from "date-fns";
import { eq } from "drizzle-orm";
import {
  availabilitySlots,
  partnerServices,
  partners,
  services,
} from "../drizzle/schema";
import { closeDatabase, getDb } from "./db";

const db = getDb();

const serviceDefinitions = [
  { name: "Lavagem essencial", description: "Lavagem externa, rodas e acabamento dos pneus." },
  { name: "Lavagem completa", description: "Lavagem externa, aspiração e limpeza de superfícies internas." },
  { name: "Higienização interna", description: "Aspiração profunda e limpeza detalhada da cabine." },
];

for (const definition of serviceDefinitions) {
  await db.insert(services).values(definition).onConflictDoNothing({ target: services.name });
}

const serviceRows = await db.select().from(services);
const serviceByName = new Map(serviceRows.map(service => [service.name, service.id]));

const partnerDefinitions = [
  {
    name: "Brilho Brasília",
    slug: "brilho-brasilia-asa-norte",
    description: "Lavagem cuidadosa e estética automotiva no coração da Asa Norte.",
    addressLine: "SCLN 210, Bloco C",
    neighborhood: "Asa Norte",
    latitude: -15.7554,
    longitude: -47.8812,
    rating: "4.9",
    reviewCount: 128,
    featured: true,
  },
  {
    name: "AutoCare Sudoeste",
    slug: "autocare-sudoeste",
    description: "Atendimento no estúdio ou na sua garagem, com hora marcada.",
    addressLine: "CLSW 103, Bloco B",
    neighborhood: "Sudoeste",
    latitude: -15.7994,
    longitude: -47.9221,
    rating: "4.8",
    reviewCount: 86,
    featured: true,
  },
  {
    name: "Lavaí DF",
    slug: "lavai-aguas-claras",
    description: "Lavagem móvel para condomínios e empresas em Águas Claras.",
    addressLine: "Atendimento móvel",
    neighborhood: "Águas Claras",
    latitude: -15.8401,
    longitude: -48.0283,
    rating: "4.7",
    reviewCount: 64,
    featured: false,
    serviceRadiusKm: "12.00",
  },
];

for (const definition of partnerDefinitions) {
  await db
    .insert(partners)
    .values({ ...definition, status: "approved" })
    .onConflictDoUpdate({
      target: partners.slug,
      set: { ...definition, status: "approved", updatedAt: new Date() },
    });
}

const partnerRows = await db.select().from(partners);
const partnerBySlug = new Map(partnerRows.map(partner => [partner.slug, partner]));

const offers = [
  ["brilho-brasilia-asa-norte", "Lavagem essencial", "onsite", "45.00", 50],
  ["brilho-brasilia-asa-norte", "Lavagem completa", "onsite", "89.00", 90],
  ["autocare-sudoeste", "Lavagem completa", "onsite", "79.00", 80],
  ["autocare-sudoeste", "Lavagem completa", "mobile", "99.00", 90],
  ["lavai-aguas-claras", "Lavagem essencial", "mobile", "65.00", 70],
  ["lavai-aguas-claras", "Higienização interna", "mobile", "129.00", 120],
] as const;

for (const [slug, serviceName, mode, price, durationMinutes] of offers) {
  const partner = partnerBySlug.get(slug);
  const serviceId = serviceByName.get(serviceName);
  if (!partner || !serviceId) continue;

  await db
    .insert(partnerServices)
    .values({
      partnerId: partner.id,
      serviceId,
      mode,
      vehicleSize: "sedan",
      price,
      durationMinutes,
    })
    .onConflictDoNothing();
}

const firstSlot = addHours(startOfHour(new Date()), 2);
for (const partner of partnerRows) {
  for (let index = 0; index < 6; index += 1) {
    const startsAt = addHours(firstSlot, index * 2);
    await db
      .insert(availabilitySlots)
      .values({
        partnerId: partner.id,
        startsAt,
        endsAt: addHours(startsAt, 1),
        capacity: 1,
      })
      .onConflictDoNothing();
  }
}

const seededPartners = await db.select().from(partners).where(eq(partners.status, "approved"));
console.log(`Seed concluído: ${seededPartners.length} parceiros aprovados.`);
await closeDatabase();
