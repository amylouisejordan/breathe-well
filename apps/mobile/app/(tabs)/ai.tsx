import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const AiScreen = () => {
  const messages = [
    { id: 1, type: "user", text: "I’m feeling short of breath today." },
    {
      id: 2,
      type: "ai",
      text: "I’m here with you. Try slowing your breathing and resting your shoulders.",
    },
    { id: 3, type: "user", text: "Thanks! Any tips for relaxation?" },
    {
      id: 4,
      type: "ai",
      text: "A gentle walk or a few minutes of calm breathing can help ease tension.",
    },
  ];

  const [input, setInput] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Companion</Text>
        <Text style={styles.subtext}>
          A gentle space to talk about how you’re feeling
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.type === "user" ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.type === "user" && styles.userMessageText,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type a message…"
          placeholderTextColor="#999"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          editable={false}
        />

        <TouchableOpacity
          style={styles.sendButton}
          disabled={true}
          accessibilityLabel="Send message"
        >
          <Ionicons name="send" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6c63ff",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },
  message: {
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#6c63ff",
    alignSelf: "flex-end",
  },
  aiMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#eee",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  userMessageText: {
    color: "#fff",
  },
  inputBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingRight: 10,
  },
  sendButton: {
    padding: 6,
  },
});

export default AiScreen;
