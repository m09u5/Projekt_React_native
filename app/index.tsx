import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function Home() {
  return (
    <ImageBackground
      source={require("../assets/Luncia.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Pet Services</Text>
        <Text style={styles.subtitle}>
          Znajdź sklepy i usługi dla zwierząt w swojej okolicy
        </Text>

        <Link href="/supportedCities" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Oferty</Text>
          </Pressable>
        </Link>

        <Link href="/map" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Mapa</Text>
          </Pressable>
        </Link>
        <Link href="/admin" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Zaloguj się</Text>
          </Pressable>
        </Link>
        <Link href="/assistant" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>asystent</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // przyciemnia tło
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
    color: "#fff",
  },
  subtitle: {
    textAlign: "center",
    color: "#eee",
    marginBottom: 32,
  },
  button: {
    opacity: 0.9,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: "#222",
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
