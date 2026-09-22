export type ServiceMode = "onsite" | "mobile";
export type VehicleSize = "compact" | "sedan" | "suv" | "pickup" | "motorcycle";

export type ServiceOffer = {
  id: string;
  name: string;
  description: string | null;
  mode: ServiceMode;
  vehicleSize: VehicleSize;
  price: number;
  durationMinutes: number;
};

export type AvailableSlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  availableCapacity: number;
};

export type NearbyPartner = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  addressLine: string;
  neighborhood: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  modes: ServiceMode[];
  startingPrice: number;
  services: ServiceOffer[];
  slots: AvailableSlot[];
};

export type NearbyPartnersResponse = {
  origin: { latitude: number; longitude: number };
  source: "database" | "demo";
  partners: NearbyPartner[];
};

export type CreateBookingInput = {
  partnerId: string;
  partnerServiceId: string;
  slotId: string;
  customerName: string;
  customerPhone: string;
  vehicleDescription: string;
  mode: ServiceMode;
  serviceAddress?: string;
  notes?: string;
};

export type CreateBookingResponse = {
  bookingId: string;
  status: "pending_partner";
  message: string;
};
