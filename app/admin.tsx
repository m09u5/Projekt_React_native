import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { createOffer } from "../src/api/offers.api";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function AdminScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const params = useLocalSearchParams<{ lat?: string; lon?: string }>();

  useEffect(() => {
    if (params.lat && params.lon) {
      setLat(params.lat);
      setLon(params.lon);
    }
  }, [params.lat, params.lon]);

  const handleSubmit = async () => {
    if (!title || !description || !lat || !lon) {
      Alert.alert("Uzupełnij wymagane pola");
      return;
    }

    try {
      await createOffer({
        title,
        description,
        animalType,
        breed,
        location: {
          city,
          lat: Number(lat),
          lon: Number(lon),
        },
        breeder: {
          id: "admin",
          name: "Panel Admina",
          verified: true,
        },
      });

      Alert.alert("Oferta dodana");
      router.back();
    } catch (e) {
      Alert.alert("Błąd zapisu oferty");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: 16 }]}>
      <Text style={styles.title}>Dodaj ofertę</Text>

      <TextInput
        placeholder="Tytuł"
        style={styles.input}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Opis"
        style={styles.input}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Typ zwierzęcia"
        style={styles.input}
        onChangeText={setAnimalType}
      />
      <TextInput
        placeholder="Rasa"
        style={styles.input}
        onChangeText={setBreed}
      />
      <TextInput
        placeholder="Miasto"
        style={styles.input}
        onChangeText={setCity}
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/admin/map-picker")}
      >
        <Text style={{ color: "#FFFFFF" }}>Wybierz lokalizację z mapy</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Zapisz ofertę</Text>
      </Pressable>
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
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 38,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  mapButton: {
    marginBottom: 12,
  },
});
