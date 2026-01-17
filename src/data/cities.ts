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
  poznan: {
    label: "Poznań",
    south: 52.350,
    west: 16.820,
    north: 52.460,
    east: 17.030,
  },
  lodz: {
    label: "Łódź",
    south: 51.690,
    west: 19.350,
    north: 51.830,
    east: 19.620,
  },
  gdansk: {
    label: "Gdańsk",
    south: 54.300,
    west: 18.500,
    north: 54.420,
    east: 18.800,
  },
  gdynia: {
    label: "Gdynia",
    south: 54.470,
    west: 18.430,
    north: 54.580,
    east: 18.560,
  },
  sopot: {
    label: "Sopot",
    south: 54.430,
    west: 18.530,
    north: 54.460,
    east: 18.580,
  },
  szczecin: {
    label: "Szczecin",
    south: 53.350,
    west: 14.450,
    north: 53.500,
    east: 14.700,
  },
  bydgoszcz: {
    label: "Bydgoszcz",
    south: 53.070,
    west: 17.900,
    north: 53.180,
    east: 18.100,
  },
  lublin: {
    label: "Lublin",
    south: 51.200,
    west: 22.450,
    north: 51.300,
    east: 22.650,
  },
  bialystok: {
    label: "Białystok",
    south: 53.080,
    west: 23.050,
    north: 53.180,
    east: 23.250,
  },
  katowice: {
    label: "Katowice",
    south: 50.200,
    west: 18.950,
    north: 50.300,
    east: 19.100,
  },
  rzeszow: {
    label: "Rzeszów",
    south: 50.000,
    west: 21.900,
    north: 50.100,
    east: 22.050,
  },
} as const;


export type CityKey = keyof typeof CITIES;
