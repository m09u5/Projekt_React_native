import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { CITIES, CityKey } from "../src/data/cities";

export default function CitySelect() {
  const router = useRouter();

  const handleSelect = (city: CityKey) => {
    router.push({
      pathname: "/list",
      params: { city },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz miasto</Text>

      {Object.entries(CITIES).map(([key, city]) => (
        <Pressable
          key={key}
          style={styles.item}
          onPress={() => handleSelect(key as CityKey)}
        >
          <Text style={styles.text}>{city.label}</Text>
        </Pressable>
      ))}
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
  },
});
