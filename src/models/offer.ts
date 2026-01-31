export type OfferType = "sale" | "adoption" | "reservation";

export type AnimalType = "dog" | "cat" | "reptile" | "other";

export interface Offer {
  id: string;

  title: string;
  description: string;

  animalType: string;
  breed?: string;

  location: {
    lat: number;
    lon: number;
    city?: string;
  };

  breeder: {
    id: string;
    name: string;
    verified: boolean;
    phone?: string;
    email?: string;
  };

  price?: number;
  availableFrom?: string;

  createdAt: string;
}
