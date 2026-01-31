import { Offer } from "../models/offer";

export const mockOffers: Offer[] = [
  {
    id: "1",
    title: "Szczeniaki Golden Retriever",
    description: "Domowa hodowla, rodzice z rodowodem",
    animalType: "dog",
    breed: "Golden Retriever",
    location: {
      lat: 51.1079,
      lon: 17.0385,
    city: "Wrocław",
    },

    breeder: {
      id: "b1",
      name: "Hodowla Gold Star",
      verified: true,
      phone: "+48123123123",
    },
    price: 4500,
    createdAt: new Date().toISOString(),
  },
];
