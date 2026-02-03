import { Offer } from "../models/offer";

export type OfferForAI = {
  breed: string;
  breeder: string;
  city: string;
};

export function prepareOffersForAI(offers: Offer[]): OfferForAI[] {
  return offers
  .filter(
    (
      o
    ): o is Offer & {
      breed: string;
      location: { city: string };
    } =>
      typeof o.breed === "string" &&
      typeof o.location?.city === "string"
  )
  .map((o) => ({
    breed: o.breed,
    breeder: o.breeder.name,
    city: o.location.city,
  }));
}

