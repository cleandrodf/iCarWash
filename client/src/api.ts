import type {
  CreateBookingInput,
  CreateBookingResponse,
  NearbyPartnersResponse,
  ServiceMode,
} from "@shared/contracts";

const parseResponse = async <T>(response: Response): Promise<T> => {
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message ?? "Não foi possível concluir a solicitação.");
  }
  return payload as T;
};

export async function findNearbyPartners(
  latitude: number,
  longitude: number,
  mode?: ServiceMode,
) {
  const params = new URLSearchParams({ lat: String(latitude), lng: String(longitude) });
  if (mode) params.set("mode", mode);

  return parseResponse<NearbyPartnersResponse>(
    await fetch(`/api/partners/nearby?${params.toString()}`),
  );
}

export async function createBooking(input: CreateBookingInput) {
  return parseResponse<CreateBookingResponse>(
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
}
