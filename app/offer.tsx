import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchOffers } from "../src/api/offers.api";
import { Offer } from "../src/models/offer";

export default function OfferDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOffers();
        const found = data.find((o) => o.id === id);
        setOffer(found ?? null);
      } catch {
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <Text style={{ padding: 24 }}>Ładowanie…</Text>;
  }

  if (!offer) {
    return <Text style={{ padding: 24 }}>Nie znaleziono oferty</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { margin: 38 }]}>{offer.title}</Text>

      {offer.breed && <Text style={styles.line}>Rasa: {offer.breed}</Text>}

      <Text style={styles.line}>{offer.description}</Text>

      <Text style={styles.line}>Lokalizacja: {offer.location.city}</Text>

      <Text style={styles.line}>
        Hodowca: {offer.breeder.name}
        {offer.breeder.verified && " ✔"}
      </Text>

      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Kontakt</Text>
        <Text style={styles.contactValue}>+48 123 456 78</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  line: {
    fontSize: 15,
    marginBottom: 6,
  },
  contactBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  contactTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
  },
  back: {
    marginTop: 24,
    alignSelf: "flex-start",
  },
});
