import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.containter}>
      <Link href="/supportedCities">wspierane miasta</Link>
      <Text>hello sigmas</Text>
      <Link href="/map">mapa</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
