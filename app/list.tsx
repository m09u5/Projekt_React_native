import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchPetStores } from "../src/api/osm.api";
import { OsmElement } from "../src/api/osm.types";
import { CITIES, CityKey } from "../src/data/cities";

export default function StoreList() {
  const { city } = useLocalSearchParams<{ city: CityKey }>();
  const [stores, setStores] = useState<OsmElement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    fetchPetStores(CITIES[city])
      .then(setStores)
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => `${item.type}-${item.id}`}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>{item.tags?.name ?? "Brak nazwy"}</Text>
        </View>
      )}
    />
  );
}
