import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Offer } from "../models/offer";

export async function fetchOffers(): Promise<Offer[]> {
  const snapshot = await getDocs(collection(db, "offers"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Offer, "id">),
  }));
}

export async function createOffer(offer: Omit<Offer, "id" | "createdAt">) {
  await addDoc(collection(db, "offers"), {
    ...offer,
    createdAt: serverTimestamp(),
  });
}
