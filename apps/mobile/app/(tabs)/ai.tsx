import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

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
  const scrollRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Companion</Text>
        <Text style={styles.subtext}>
          A gentle space to talk about how you’re feeling
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.type === "user" ? styles.rowRight : styles.rowLeft,
            ]}
            accessibilityRole="text"
          >
            {msg.type === "ai" && (
              <View style={styles.avatar}>
                <Ionicons name="sparkles" size={20} color="#6c63ff" />
              </View>
            )}

            <View
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

            {msg.type === "user" && (
              <View style={styles.avatarUser}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
            )}
          </View>
        ))}

        <Text style={styles.footerNote}>
          BreatheWell is here to support you.
        </Text>
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Messaging coming soon…"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={input}
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
    fontSize: 26,
    fontWeight: "700",
    color: "#6c63ff",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 14,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  message: {
    padding: 14,
    borderRadius: 18,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#6c63ff",
  },
  aiMessage: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },

  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
  userMessageText: {
    color: "#fff",
  },

  footerNote: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
    fontSize: 13,
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
