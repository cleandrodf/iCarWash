import type { NearbyPartner, ServiceMode } from "../shared/contracts";
import { calculateDistanceKm, type Coordinates } from "./services/distance";

const buildSlots = (offsetHours: number) => {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  now.setHours(now.getHours() + offsetHours);

  return Array.from({ length: 3 }, (_, index) => {
    const start = new Date(now.getTime() + index * 90 * 60_000);
    const end = new Date(start.getTime() + 60 * 60_000);
    return {
      id: `demo-slot-${offsetHours}-${index}`,
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
      availableCapacity: 1,
    };
  });
};

const partners: Omit<NearbyPartner, "distanceKm">[] = [
  {
    id: "demo-partner-asa-norte",
    name: "Brilho Brasília",
    slug: "brilho-brasilia-asa-norte",
    description: "Lavagem cuidadosa e estética automotiva no coração da Asa Norte.",
    addressLine: "SCLN 210, Bloco C",
    neighborhood: "Asa Norte",
    city: "Brasília",
    region: "DF",
    latitude: -15.7554,
    longitude: -47.8812,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    modes: ["onsite"],
    startingPrice: 45,
    services: [
      {
        id: "demo-offer-1",
        name: "Lavagem essencial",
        description: "Lavagem externa, rodas e acabamento dos pneus.",
        mode: "onsite",
        vehicleSize: "sedan",
        price: 45,
        durationMinutes: 50,
      },
      {
        id: "demo-offer-2",
        name: "Lavagem completa",
        description: "Lavagem externa, aspiração e limpeza interna.",
        mode: "onsite",
        vehicleSize: "sedan",
        price: 89,
        durationMinutes: 90,
      },
    ],
    slots: buildSlots(2),
  },
  {
    id: "demo-partner-sudoeste",
    name: "AutoCare Sudoeste",
    slug: "autocare-sudoeste",
    description: "Atendimento no estúdio ou na sua garagem, com hora marcada.",
    addressLine: "CLSW 103, Bloco B",
    neighborhood: "Sudoeste",
    city: "Brasília",
    region: "DF",
    latitude: -15.7994,
    longitude: -47.9221,
    rating: 4.8,
    reviewCount: 86,
    featured: true,
    modes: ["onsite", "mobile"],
    startingPrice: 55,
    services: [
      {
        id: "demo-offer-3",
        name: "Lavagem completa",
        description: "Exterior, rodas, aspiração e painéis.",
        mode: "onsite",
        vehicleSize: "sedan",
        price: 79,
        durationMinutes: 80,
      },
      {
        id: "demo-offer-4",
        name: "Lavagem delivery",
        description: "Equipe equipada para atender no endereço informado.",
        mode: "mobile",
        vehicleSize: "sedan",
        price: 99,
        durationMinutes: 90,
      },
    ],
    slots: buildSlots(3),
  },
  {
    id: "demo-partner-aguas-claras",
    name: "Lavaí DF",
    slug: "lavai-aguas-claras",
    description: "Lavagem móvel para condomínios e empresas em Águas Claras.",
    addressLine: "Atendimento móvel",
    neighborhood: "Águas Claras",
    city: "Brasília",
    region: "DF",
    latitude: -15.8401,
    longitude: -48.0283,
    rating: 4.7,
    reviewCount: 64,
    featured: false,
    modes: ["mobile"],
    startingPrice: 65,
    services: [
      {
        id: "demo-offer-5",
        name: "Lavagem ecológica móvel",
        description: "Lavagem de baixo consumo de água no seu endereço.",
        mode: "mobile",
        vehicleSize: "sedan",
        price: 65,
        durationMinutes: 70,
      },
      {
        id: "demo-offer-6",
        name: "Higienização interna",
        description: "Aspiração profunda e limpeza de superfícies internas.",
        mode: "mobile",
        vehicleSize: "sedan",
        price: 129,
        durationMinutes: 120,
      },
    ],
    slots: buildSlots(4),
  },
];

export function getDemoPartners(origin: Coordinates, mode?: ServiceMode) {
  return partners
    .filter(partner => !mode || partner.modes.includes(mode))
    .map(partner => ({
      ...partner,
      distanceKm: calculateDistanceKm(origin, partner),
      services: partner.services.filter(service => !mode || service.mode === mode),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
