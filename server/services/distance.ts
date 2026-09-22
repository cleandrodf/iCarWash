export type Coordinates = {
  latitude: number;
  longitude: number;
};

const EARTH_RADIUS_KM = 6371.0088;

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistanceKm(from: Coordinates, to: Coordinates) {
  const latitudeDelta = degreesToRadians(to.latitude - from.latitude);
  const longitudeDelta = degreesToRadians(to.longitude - from.longitude);
  const fromLatitude = degreesToRadians(from.latitude);
  const toLatitude = degreesToRadians(to.latitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) * Math.cos(toLatitude) * Math.sin(longitudeDelta / 2) ** 2;

  const angularDistance = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return EARTH_RADIUS_KM * angularDistance;
}

export function isValidCoordinates(coordinates: Coordinates) {
  return (
    Number.isFinite(coordinates.latitude) &&
    Number.isFinite(coordinates.longitude) &&
    coordinates.latitude >= -90 &&
    coordinates.latitude <= 90 &&
    coordinates.longitude >= -180 &&
    coordinates.longitude <= 180
  );
}
