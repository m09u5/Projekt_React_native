import { BoundingBox } from "../api/osm.types";
export const CITIES = {
  warszawa: {
    label: "Warszawa",
    south: 52.097,
    west: 20.851,
    north: 52.368,
    east: 21.271,
  },
  krakow: {
    label: "Kraków",
    south: 50.019,
    west: 19.792,
    north: 50.125,
    east: 20.120,
  },
  wroclaw: {
    label: "Wrocław",
    south: 51.060,
    west: 16.900,
    north: 51.160,
    east: 17.100,
  },
} as const;

export type CityKey = keyof typeof CITIES;
