import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef } from "react";

import { fetchOffers } from "../src/api/offers.api";
import { prepareOffersForAI } from "../src/ai/prepareOffersForAI";
import { askAI } from "../src/ai/ai.api";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
};

export default function AssistantScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const offers = await fetchOffers();
      const aiOffers = prepareOffersForAI(offers);

      const offersText = aiOffers
        .map((o) => `- ${o.breed} – ${o.breeder} (${o.city})`)
        .join("\n");

      const prompt = `
Użytkownik pisze:
"${userMessage.text}"

Dostępne oferty:
${offersText}

Odpowiedz jak asystent:
- poleć 1–2 rasy
- wskaż hodowcę
- nie wymyślaj nic spoza listy
- krótko i naturalnie
`;

      const aiResponse = await askAI(prompt);

      const aiMessage: ChatMessage = {
        id: Date.now().toString() + "-ai",
        role: "ai",
        text: aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          role: "ai",
          text: "Coś poszło nie tak. Spróbuj ponownie.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.bubble,
        item.role === "user" ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text
        style={[
          styles.text,
          item.role === "user" ? styles.userText : styles.aiText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chat}
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Napisz wiadomość..."
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Pressable
          style={[styles.sendButton, loading && { opacity: 0.5 }]}
          onPress={sendMessage}
          disabled={loading}
        >
          <Text style={styles.sendText}>Wyślij</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chat: {
    padding: 16,
    paddingBottom: 80,
  },
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: "#111",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#000",
  },
  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#111",
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
});
