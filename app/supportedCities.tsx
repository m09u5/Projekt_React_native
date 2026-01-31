import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchOffers } from "../src/api/offers.api";
import { Offer } from "../src/models/offer";

export default function CitySelect() {
  const router = useRouter();

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (e) {
        console.log("Błąd pobierania ofert", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSelect = (offerId: string) => {
    router.push({
      pathname: "/offer",
      params: { id: offerId },
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Text style={styles.title}>Dostępne oferty</Text>

      {offers.map((offer) => (
        <Pressable
          key={offer.id}
          style={styles.item}
          onPress={() => handleSelect(offer.id)}
        >
          <Text style={styles.text}>{offer.title}</Text>
          {offer.location?.city && (
            <Text style={styles.subText}>{offer.location.city}</Text>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    paddingTop: 28,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    marginTop: 4,
    fontSize: 13,
    color: "#555",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
