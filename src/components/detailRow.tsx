import { Text, View, Pressable, Linking } from "react-native";
const isPhoneNumber = (value?: string) => {
  if (!value) return false;
  return /^[+0-9\s()-]+$/.test(value);
};

const isEmail = (value?: string) => {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isWebsite = (value?: string) => {
  if (!value) return false;
  return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}/i.test(value);
};

const normalizeWebsiteUrl = (value: string) => {
  return value.startsWith("http") ? value : `https://${value}`;
};

type DetailRowProps = {
  label: string;
  value?: string;
};

export const DetailRow = ({ label, value }: DetailRowProps) => {
  if (!value) {
    return (
      <View style={{ marginBottom: 6 }}>
        <Text style={{ color: "#999" }}>{label}: brak danych</Text>
      </View>
    );
  }

  if (isPhoneNumber(value)) {
    return (
      <View style={{ marginBottom: 6 }}>
        <Pressable onPress={() => Linking.openURL(`tel:${value}`)}>
          <Text>
            {label}: <Text style={{ color: "#007AFF" }}>{value}</Text>
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isEmail(value)) {
    return (
      <View style={{ marginBottom: 6 }}>
        <Pressable onPress={() => Linking.openURL(`mailto:${value}`)}>
          <Text>
            {label}: <Text style={{ color: "#007AFF" }}>{value}</Text>
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isWebsite(value)) {
    return (
      <View style={{ marginBottom: 6 }}>
        <Pressable onPress={() => Linking.openURL(normalizeWebsiteUrl(value))}>
          <Text>
            {label}: <Text style={{ color: "#007AFF" }}>{value}</Text>
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 6 }}>
      <Text>
        {label}: {value}
      </Text>
    </View>
  );
};
