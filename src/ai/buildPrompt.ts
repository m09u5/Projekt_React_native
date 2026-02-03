import { OfferForAI } from "./prepareOffersForAI";

export function buildPrompt(
  prefs: {
    home: string;
    activity: string;
    kids: boolean;
  },
  offers: OfferForAI[]
): string {
  const offersText = offers
    .map(
      (o) => `- ${o.breed} – ${o.breeder} (${o.city})`
    )
    .join("\n");

  return `
Użytkownik:
- Typ mieszkania: ${prefs.home}
- Aktywność: ${prefs.activity}
- Dzieci: ${prefs.kids ? "tak" : "nie"}

Dostępne oferty w systemie:
${offersText}

Zadanie:
Poleć jedną lub dwie rasy, które mogą pasować do użytkownika.
Wskaż konkretnego hodowcę z listy.
Nie wymyślaj ras ani hodowców spoza listy.
Odpowiadaj krótko i naturalnie.
`;
}
