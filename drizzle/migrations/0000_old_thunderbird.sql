CREATE TYPE "public"."booking_status" AS ENUM('pending_partner', 'confirmed', 'in_service', 'completed', 'cancelled', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."partner_status" AS ENUM('pending', 'approved', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."service_mode" AS ENUM('onsite', 'mobile');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'partner', 'admin');--> statement-breakpoint
CREATE TYPE "public"."vehicle_size" AS ENUM('compact', 'sedan', 'suv', 'pickup', 'motorcycle');--> statement-breakpoint
CREATE TABLE "availability_slots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"partner_id" uuid NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"capacity" integer DEFAULT 1 NOT NULL,
	"reserved_count" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid,
	"partner_id" uuid NOT NULL,
	"partner_service_id" uuid NOT NULL,
	"slot_id" uuid NOT NULL,
	"vehicle_id" uuid,
	"customer_name" varchar(160) NOT NULL,
	"customer_phone" varchar(32) NOT NULL,
	"vehicle_description" varchar(180) NOT NULL,
	"service_address" varchar(280),
	"mode" "service_mode" NOT NULL,
	"status" "booking_status" DEFAULT 'pending_partner' NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"payment_method" varchar(40) DEFAULT 'pay_on_site' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partner_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"partner_id" uuid NOT NULL,
	"service_id" integer NOT NULL,
	"mode" "service_mode" NOT NULL,
	"vehicle_size" "vehicle_size" NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"duration_minutes" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_user_id" uuid,
	"name" varchar(180) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"description" text,
	"status" "partner_status" DEFAULT 'pending' NOT NULL,
	"rating" numeric(2, 1) DEFAULT '0' NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"address_line" varchar(240) NOT NULL,
	"neighborhood" varchar(120) NOT NULL,
	"city" varchar(120) DEFAULT 'Brasília' NOT NULL,
	"region" varchar(2) DEFAULT 'DF' NOT NULL,
	"postal_code" varchar(12),
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"service_radius_km" numeric(6, 2),
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"customer_id" uuid,
	"partner_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(140) NOT NULL,
	"description" text,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(32),
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"nickname" varchar(80),
	"brand" varchar(80) NOT NULL,
	"model" varchar(100) NOT NULL,
	"size" "vehicle_size" NOT NULL,
	"plate" varchar(10),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_partner_service_id_partner_services_id_fk" FOREIGN KEY ("partner_service_id") REFERENCES "public"."partner_services"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slot_id_availability_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."availability_slots"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partner_services" ADD CONSTRAINT "partner_services_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partner_services" ADD CONSTRAINT "partner_services_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partners" ADD CONSTRAINT "partners_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "availability_partner_time_idx" ON "availability_slots" USING btree ("partner_id","starts_at");--> statement-breakpoint
CREATE UNIQUE INDEX "availability_slot_unique" ON "availability_slots" USING btree ("partner_id","starts_at");--> statement-breakpoint
CREATE INDEX "bookings_partner_status_idx" ON "bookings" USING btree ("partner_id","status");--> statement-breakpoint
CREATE INDEX "partner_services_partner_idx" ON "partner_services" USING btree ("partner_id");--> statement-breakpoint
CREATE UNIQUE INDEX "partner_service_offer_unique" ON "partner_services" USING btree ("partner_id","service_id","mode","vehicle_size");--> statement-breakpoint
CREATE UNIQUE INDEX "partners_slug_unique" ON "partners" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "partners_location_idx" ON "partners" USING btree ("latitude","longitude");--> statement-breakpoint
CREATE INDEX "partners_status_idx" ON "partners" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_booking_unique" ON "reviews" USING btree ("booking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "services_name_unique" ON "services" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");