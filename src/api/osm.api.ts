import { OsmElement, OverpassResponse, BoundingBox } from "./osm.types";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export async function fetchPetStores(
  box: BoundingBox
): Promise<OsmElement[]> {
  const { south, west, north, east } = box;

  const query = `
    [out:json][timeout:25];
    (
      node["shop"="pet"](${south},${west},${north},${east});
      way["shop"="pet"](${south},${west},${north},${east});
    );
    out center tags;
  `;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "Accept": "application/json",
    },
    body: query,
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("Overpass error:", text);
    throw new Error("Overpass API error");
  }

  const data: OverpassResponse = JSON.parse(text);
  return data.elements;
}
export async function fetchPetStoresNearby(
  lat: number,
  lon: number,
  radiusMeters = 2000
): Promise<OsmElement[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["shop"="pet"](around:${radiusMeters},${lat},${lon});
      way["shop"="pet"](around:${radiusMeters},${lat},${lon});
    );
    out center tags;
  `;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      Accept: "application/json",
    },
    body: query,
  });

  const text = await response.text();

  if (!response.ok) {
    console.error(text);
    throw new Error("Overpass API error");
  }

  return JSON.parse(text).elements;
}
