import { describe, expect, it } from "vitest";
import { getDemoPartners } from "../demo-data";
import { calculateDistanceKm, isValidCoordinates } from "./distance";

describe("calculateDistanceKm", () => {
  it("retorna zero para o mesmo ponto", () => {
    const point = { latitude: -15.793889, longitude: -47.882778 };
    expect(calculateDistanceKm(point, point)).toBeCloseTo(0, 8);
  });

  it("calcula uma distância plausível entre Brasília e Águas Claras", () => {
    const brasilia = { latitude: -15.793889, longitude: -47.882778 };
    const aguasClaras = { latitude: -15.8401, longitude: -48.0283 };
    expect(calculateDistanceKm(brasilia, aguasClaras)).toBeGreaterThan(14);
    expect(calculateDistanceKm(brasilia, aguasClaras)).toBeLessThan(19);
  });
});

describe("isValidCoordinates", () => {
  it("aceita coordenadas válidas e rejeita limites impossíveis", () => {
    expect(isValidCoordinates({ latitude: -15.8, longitude: -47.9 })).toBe(true);
    expect(isValidCoordinates({ latitude: -91, longitude: -47.9 })).toBe(false);
    expect(isValidCoordinates({ latitude: -15.8, longitude: 181 })).toBe(false);
  });
});

describe("getDemoPartners", () => {
  it("ordena parceiros pela menor distância", () => {
    const partners = getDemoPartners({ latitude: -15.793889, longitude: -47.882778 });
    const distances = partners.map(partner => partner.distanceKm);
    expect(distances).toEqual([...distances].sort((a, b) => a - b));
  });

  it("filtra modalidades de atendimento", () => {
    const partners = getDemoPartners(
      { latitude: -15.793889, longitude: -47.882778 },
      "mobile",
    );
    expect(partners.length).toBeGreaterThan(0);
    expect(partners.every(partner => partner.modes.includes("mobile"))).toBe(true);
    expect(partners.every(partner => partner.services.every(service => service.mode === "mobile"))).toBe(true);
  });
});
