import { and, asc, eq, gt, sql } from "drizzle-orm";
import {
  availabilitySlots,
  partnerServices,
  partners,
  services,
} from "../drizzle/schema";
import type {
  CreateBookingInput,
  CreateBookingResponse,
  NearbyPartner,
  ServiceMode,
} from "../shared/contracts";
import { getDb, getPool } from "./db";
import { calculateDistanceKm, type Coordinates } from "./services/distance";

export async function getNearbyPartnersFromDatabase(
  origin: Coordinates,
  mode?: ServiceMode,
): Promise<NearbyPartner[]> {
  const db = getDb();
  const partnerRows = await db
    .select()
    .from(partners)
    .where(eq(partners.status, "approved"));

  const results = await Promise.all(
    partnerRows.map(async partner => {
      const offers = await db
        .select({
          id: partnerServices.id,
          name: services.name,
          description: services.description,
          mode: partnerServices.mode,
          vehicleSize: partnerServices.vehicleSize,
          price: partnerServices.price,
          durationMinutes: partnerServices.durationMinutes,
        })
        .from(partnerServices)
        .innerJoin(services, eq(partnerServices.serviceId, services.id))
        .where(
          and(
            eq(partnerServices.partnerId, partner.id),
            eq(partnerServices.active, true),
            eq(services.active, true),
            mode ? eq(partnerServices.mode, mode) : undefined,
          ),
        );

      if (offers.length === 0) return null;

      const slots = await db
        .select()
        .from(availabilitySlots)
        .where(
          and(
            eq(availabilitySlots.partnerId, partner.id),
            eq(availabilitySlots.active, true),
            gt(availabilitySlots.startsAt, new Date()),
            sql`${availabilitySlots.reservedCount} < ${availabilitySlots.capacity}`,
          ),
        )
        .orderBy(asc(availabilitySlots.startsAt))
        .limit(4);

      const modes = [...new Set(offers.map(offer => offer.mode))];

      return {
        id: partner.id,
        name: partner.name,
        slug: partner.slug,
        description: partner.description,
        addressLine: partner.addressLine,
        neighborhood: partner.neighborhood,
        city: partner.city,
        region: partner.region,
        latitude: partner.latitude,
        longitude: partner.longitude,
        distanceKm: calculateDistanceKm(origin, partner),
        rating: Number(partner.rating),
        reviewCount: partner.reviewCount,
        featured: partner.featured,
        modes,
        startingPrice: Math.min(...offers.map(offer => Number(offer.price))),
        services: offers.map(offer => ({
          ...offer,
          price: Number(offer.price),
        })),
        slots: slots.map(slot => ({
          id: slot.id,
          startsAt: slot.startsAt.toISOString(),
          endsAt: slot.endsAt.toISOString(),
          availableCapacity: slot.capacity - slot.reservedCount,
        })),
      } satisfies NearbyPartner;
    }),
  );

  return results
    .filter((partner): partner is NearbyPartner => partner !== null)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export async function createBookingInDatabase(
  input: CreateBookingInput,
): Promise<CreateBookingResponse> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const offerResult = await client.query<{
      offer_id: string;
      partner_id: string;
      mode: ServiceMode;
      price: string;
      slot_id: string;
      capacity: number;
      reserved_count: number;
      slot_active: boolean;
      starts_at: Date;
    }>(
      `SELECT
        ps.id AS offer_id,
        ps.partner_id,
        ps.mode,
        ps.price,
        a.id AS slot_id,
        a.capacity,
        a.reserved_count,
        a.active AS slot_active,
        a.starts_at
      FROM partner_services ps
      JOIN availability_slots a ON a.id = $2 AND a.partner_id = ps.partner_id
      WHERE ps.id = $1 AND ps.partner_id = $3 AND ps.active = TRUE
      FOR UPDATE OF a`,
      [input.partnerServiceId, input.slotId, input.partnerId],
    );

    const offer = offerResult.rows[0];
    if (!offer) throw new Error("Serviço ou horário não encontrado.");
    if (!offer.slot_active || offer.starts_at <= new Date()) throw new Error("Este horário não está mais disponível.");
    if (offer.reserved_count >= offer.capacity) throw new Error("Este horário acabou de ser preenchido.");
    if (offer.mode !== input.mode) throw new Error("A modalidade escolhida não corresponde ao serviço.");
    if (input.mode === "mobile" && !input.serviceAddress?.trim()) {
      throw new Error("Informe o endereço para atendimento móvel.");
    }

    await client.query(
      "UPDATE availability_slots SET reserved_count = reserved_count + 1 WHERE id = $1",
      [input.slotId],
    );

    const bookingResult = await client.query<{ id: string }>(
      `INSERT INTO bookings (
        partner_id,
        partner_service_id,
        slot_id,
        customer_name,
        customer_phone,
        vehicle_description,
        service_address,
        mode,
        status,
        total_price,
        payment_method,
        notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending_partner', $9, 'pay_on_site', $10)
      RETURNING id`,
      [
        input.partnerId,
        input.partnerServiceId,
        input.slotId,
        input.customerName,
        input.customerPhone,
        input.vehicleDescription,
        input.serviceAddress ?? null,
        input.mode,
        offer.price,
        input.notes ?? null,
      ],
    );

    await client.query("COMMIT");

    return {
      bookingId: bookingResult.rows[0].id,
      status: "pending_partner",
      message: "Solicitação enviada. O parceiro deverá confirmar o horário.",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
