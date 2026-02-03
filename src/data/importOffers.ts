import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import offers from "../data/importOffers.json";

export async function importOffersFromJson() {
  const ref = collection(db, "offers");

  for (const offer of offers) {
    await addDoc(ref, {
      ...offer,
      createdAt: serverTimestamp(),
    });
  }

  console.log("✅ Oferty zaimportowane do Firestore");
}
