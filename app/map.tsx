import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Text,
  Modal,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { fetchOffers } from "../src/api/offers.api";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { fetchPetStoresNearby } from "../src/api/osm.api";
import { OsmElement } from "../src/api/osm.types";
import { distanceKm } from "../src/utils/distanceCalculator";
import Slider from "@react-native-community/slider";
import { Offer } from "../src/models/offer";

export default function MapScreen() {
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [stores, setStores] = useState<OsmElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState<OsmElement | null>(null);
  const [radiusKm, setRadiusKm] = useState(2);
  const [radiusMenuVisible, setRadiusMenuVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (e) {
        console.log("Błąd pobierania ofert", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !location) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const { latitude, longitude } = location.coords;
  const userLat = location?.coords.latitude;
  const userLon = location?.coords.longitude;

  const offerDistance =
    selectedOffer && userLat && userLon
      ? distanceKm(
          userLat,
          userLon,
          selectedOffer.location.lat,
          selectedOffer.location.lon
        )
      : null;

  const distanceLabel =
    offerDistance !== null
      ? offerDistance < 1
        ? `${Math.round(offerDistance * 1000)} m`
        : `${offerDistance.toFixed(2)} km`
      : null;

  return (
    <View style={{ flex: 1 }}>
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
          pinColor="blue"
          title="Tu jesteś"
        />

        {offers.map((offer) => (
          <Marker
            key={offer.id}
            coordinate={{
              latitude: offer.location.lat,
              longitude: offer.location.lon,
            }}
          >
            <Callout onPress={() => setSelectedOffer(offer)}>
              <View style={{ padding: 6, maxWidth: 200 }}>
                <Text style={{ fontWeight: "600" }}>{offer.title}</Text>
                {offer.breed && (
                  <Text style={{ fontSize: 12, color: "#555" }}>
                    {offer.breed}
                  </Text>
                )}
                <Text style={{ fontSize: 12, color: "#777" }}>
                  Dotknij, aby zobaczyć szczegóły
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Pressable style={styles.fab} onPress={() => setMenuVisible(true)}>
        <Text style={styles.fabText}>☰</Text>
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setRadiusMenuVisible(true);
              }}
            >
              <Text style={styles.menuText}>
                Zmień odległość ({radiusKm} km)
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.replace("/");
              }}
            >
              <Text style={styles.menuText}>← Powrót</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <Modal
        transparent
        animationType="slide"
        visible={!!selectedOffer}
        onRequestClose={() => setSelectedOffer(null)}
      >
        <View style={styles.detailsOverlay}>
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>{selectedOffer?.title}</Text>
            {distanceLabel && (
              <Text style={{ color: "#555", marginBottom: 8 }}>
                {distanceLabel} od Ciebie
              </Text>
            )}

            {selectedOffer?.breed && (
              <Text style={{ marginBottom: 6 }}>
                Rasa: {selectedOffer.breed}
              </Text>
            )}

            <Text style={{ marginBottom: 8 }}>
              {selectedOffer?.description}
            </Text>

            <Text style={{ color: "#555", marginBottom: 8 }}>
              Lokalizacja: {selectedOffer?.location.city}
            </Text>

            <Text style={{ marginBottom: 8 }}>
              Hodowca: {selectedOffer?.breeder.name}
              {selectedOffer?.breeder.verified && " ✔"}
            </Text>
            <Text style={{ marginBottom: 8 }}>Zadzwoń: +48 123 456 789</Text>

            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedOffer(null)}
            >
              <Text style={styles.closeText}>Zamknij</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        animationType="fade"
        visible={radiusMenuVisible}
        onRequestClose={() => setRadiusMenuVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setRadiusMenuVisible(false)}
        >
          <View style={styles.menu}>
            <Text
              style={{
                paddingTop: 8,
                paddingHorizontal: 8,
                marginBottom: 12,
                fontWeight: "600",
                alignSelf: "center",
              }}
            >
              Zasięg wyszukiwania
            </Text>

            <Text style={styles.menuItemxd}>{radiusKm} km</Text>
            <View style={{ width: 200 }}>
              <Slider
                style={{ maxWidth: 180, paddingHorizontal: 8, width: "100%" }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={radiusKm}
                onSlidingComplete={(value) => setRadiusKm(value)}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#007AFF"
              />
            </View>
            <Pressable
              style={{
                paddingHorizontal: 8,
                marginTop: 16,
                alignSelf: "flex-end",
              }}
              onPress={() => setRadiusMenuVisible(false)}
            >
              <Text style={{ color: "#007AFF" }}>Gotowe</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    minWidth: 180,
    maxWidth: 220,
    paddingVertical: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  menuItemxd: {
    paddingHorizontal: 12,
    alignSelf: "flex-end",
  },
  menuText: {
    fontSize: 16,
  },
  detailsOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  detailsCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
