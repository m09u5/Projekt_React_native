import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { fetchPetStoresNearby } from "../src/api/osm.api";
import { OsmElement } from "../src/api/osm.types";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [stores, setStores] = useState<OsmElement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const { latitude, longitude } = loc.coords;
      const data = await fetchPetStoresNearby(latitude, longitude, 2000);
      setStores(data);

      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const { latitude, longitude } = location.coords;

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title="Tu jesteś"
        pinColor="blue"
      />

      {stores.map((store) => {
        const lat = store.lat ?? store.center?.lat;
        const lon = store.lon ?? store.center?.lon;

        if (!lat || !lon) return null;

        return (
          <Marker
            key={`${store.type}-${store.id}`}
            coordinate={{ latitude: lat, longitude: lon }}
            title={store.tags?.name ?? "Sklep zoologiczny"}
          />
        );
      })}
    </MapView>
  );
}
