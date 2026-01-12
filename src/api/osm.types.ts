export interface OsmTags {
  name?: string;
  "addr:street"?: string;
  "addr:housenumber"?: string;
  "addr:city"?: string;
  phone?: string;
  opening_hours?: string;
  shop?: string;
  "contact:facebook"?: string;
  email?: string;
  website?: string;
}

export interface OsmElement {
  id: number;
  type: "node" | "way";
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: OsmTags;
  
}

export interface OverpassResponse {
  elements: OsmElement[];
}
export interface BoundingBox {
  south: number;
  west: number;
  north: number;
  east: number;
}

