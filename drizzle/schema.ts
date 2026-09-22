import {
  boolean,
  doublePrecision,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["customer", "partner", "admin"]);
export const serviceModeEnum = pgEnum("service_mode", ["onsite", "mobile"]);
export const partnerStatusEnum = pgEnum("partner_status", ["pending", "approved", "suspended"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending_partner",
  "confirmed",
  "in_service",
  "completed",
  "cancelled",
  "rejected",
]);
export const vehicleSizeEnum = pgEnum("vehicle_size", ["compact", "sedan", "suv", "pickup", "motorcycle"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 32 }),
    role: userRoleEnum("role").default("customer").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  table => [uniqueIndex("users_email_unique").on(table.email)],
);

export const partners = pgTable(
  "partners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerUserId: uuid("owner_user_id").references(() => users.id, { onDelete: "set null" }),
    name: varchar("name", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull(),
    description: text("description"),
    status: partnerStatusEnum("status").default("pending").notNull(),
    rating: numeric("rating", { precision: 2, scale: 1 }).default("0").notNull(),
    reviewCount: integer("review_count").default(0).notNull(),
    addressLine: varchar("address_line", { length: 240 }).notNull(),
    neighborhood: varchar("neighborhood", { length: 120 }).notNull(),
    city: varchar("city", { length: 120 }).default("Brasília").notNull(),
    region: varchar("region", { length: 2 }).default("DF").notNull(),
    postalCode: varchar("postal_code", { length: 12 }),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    serviceRadiusKm: numeric("service_radius_km", { precision: 6, scale: 2 }),
    featured: boolean("featured").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  table => [
    uniqueIndex("partners_slug_unique").on(table.slug),
    index("partners_location_idx").on(table.latitude, table.longitude),
    index("partners_status_idx").on(table.status),
  ],
);

export const services = pgTable(
  "services",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 140 }).notNull(),
    description: text("description"),
    active: boolean("active").default(true).notNull(),
  },
  table => [uniqueIndex("services_name_unique").on(table.name)],
);

export const partnerServices = pgTable(
  "partner_services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    partnerId: uuid("partner_id")
      .references(() => partners.id, { onDelete: "cascade" })
      .notNull(),
    serviceId: integer("service_id")
      .references(() => services.id, { onDelete: "restrict" })
      .notNull(),
    mode: serviceModeEnum("mode").notNull(),
    vehicleSize: vehicleSizeEnum("vehicle_size").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    active: boolean("active").default(true).notNull(),
  },
  table => [
    index("partner_services_partner_idx").on(table.partnerId),
    uniqueIndex("partner_service_offer_unique").on(
      table.partnerId,
      table.serviceId,
      table.mode,
      table.vehicleSize,
    ),
  ],
);

export const availabilitySlots = pgTable(
  "availability_slots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    partnerId: uuid("partner_id")
      .references(() => partners.id, { onDelete: "cascade" })
      .notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    capacity: integer("capacity").default(1).notNull(),
    reservedCount: integer("reserved_count").default(0).notNull(),
    active: boolean("active").default(true).notNull(),
  },
  table => [
    index("availability_partner_time_idx").on(table.partnerId, table.startsAt),
    uniqueIndex("availability_slot_unique").on(table.partnerId, table.startsAt),
  ],
);

export const vehicles = pgTable("vehicles", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  nickname: varchar("nickname", { length: 80 }),
  brand: varchar("brand", { length: 80 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  size: vehicleSizeEnum("size").notNull(),
  plate: varchar("plate", { length: 10 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerId: uuid("customer_id").references(() => users.id, { onDelete: "set null" }),
    partnerId: uuid("partner_id")
      .references(() => partners.id, { onDelete: "restrict" })
      .notNull(),
    partnerServiceId: uuid("partner_service_id")
      .references(() => partnerServices.id, { onDelete: "restrict" })
      .notNull(),
    slotId: uuid("slot_id")
      .references(() => availabilitySlots.id, { onDelete: "restrict" })
      .notNull(),
    vehicleId: uuid("vehicle_id").references(() => vehicles.id, { onDelete: "set null" }),
    customerName: varchar("customer_name", { length: 160 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 32 }).notNull(),
    vehicleDescription: varchar("vehicle_description", { length: 180 }).notNull(),
    serviceAddress: varchar("service_address", { length: 280 }),
    mode: serviceModeEnum("mode").notNull(),
    status: bookingStatusEnum("status").default("pending_partner").notNull(),
    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    paymentMethod: varchar("payment_method", { length: 40 }).default("pay_on_site").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  table => [index("bookings_partner_status_idx").on(table.partnerId, table.status)],
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id")
      .references(() => bookings.id, { onDelete: "cascade" })
      .notNull(),
    customerId: uuid("customer_id").references(() => users.id, { onDelete: "set null" }),
    partnerId: uuid("partner_id")
      .references(() => partners.id, { onDelete: "cascade" })
      .notNull(),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    visible: boolean("visible").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  table => [uniqueIndex("reviews_booking_unique").on(table.bookingId)],
);

export type Partner = typeof partners.$inferSelect;
export type PartnerService = typeof partnerServices.$inferSelect;
export type AvailabilitySlot = typeof availabilitySlots.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
