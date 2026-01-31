import { View, Text, Pressable, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function MapPicker() {
  const router = useRouter();
  const [selected, setSelected] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handlePress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelected({ lat: latitude, lon: longitude });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 52.23,
          longitude: 21.01,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onPress={handlePress}
      >
        {selected && (
          <Marker
            coordinate={{
              latitude: selected.lat,
              longitude: selected.lon,
            }}
          />
        )}
      </MapView>

      <View style={styles.footer}>
        <Text>
          {selected
            ? `Wybrane: ${selected.lat.toFixed(5)}, ${selected.lon.toFixed(5)}`
            : "Dotknij mapy, aby wybrać punkt"}
        </Text>

        <Pressable
          style={[styles.button, !selected && { opacity: 0.5 }]}
          disabled={!selected}
          onPress={() => {
            router.replace({
              pathname: "/admin",
              params: {
                lat: selected!.lat.toString(),
                lon: selected!.lon.toString(),
              },
            });
          }}
        >
          <Text style={styles.buttonText}>Użyj tej lokalizacji</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
