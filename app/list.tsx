import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchPetStores } from "../src/api/osm.api";
import { OsmElement } from "../src/api/osm.types";
import { CITIES, CityKey } from "../src/data/cities";

export default function StoreList() {
  const { city } = useLocalSearchParams<{ city?: string }>();

  const [stores, setStores] = useState<OsmElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!city || !(city in CITIES)) {
      setLoading(false);
      setError(true);
      return;
    }

    const cityKey = city as CityKey;

    const load = async () => {
      try {
        const data = await fetchPetStores(CITIES[cityKey]);
        setStores(
          data.filter(
            (store) => store.tags?.name && store.tags.name.trim() !== ""
          )
        );
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [city]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Dane chwilowo niedostępne</Text>
        <Text>Spróbuj ponownie za chwilę</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <FlatList
        data={stores}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <Text>{item.tags!.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
