import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router/build/useNavigation";
import { useAuth } from "../utils/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AiScreen = () => {
  const [barHeight, setBarHeight] = useState(88);
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] ?? user?.email ?? "friend";

  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const CHAT_URL =
    "https://rcn1qaqns3.execute-api.eu-west-2.amazonaws.com/prod";
  const [messages, setMessages] = useState<
    { id: number; type: string; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, barHeight]);

  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    const unsub = navigation.addListener("focus", () =>
      inputRef.current?.focus()
    );
    return unsub;
  }, [navigation]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMsg = { id: Date.now(), type: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((x) => ({
            role: x.type === "user" ? "user" : "assistant",
            content: x.text,
          })),
          patient: { name: firstName, copdStage: "GOLD II" },
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          type: "ai",
          text: (data.reply ?? "Sorry, something went wrong.").replace(
            /^\s+/,
            ""
          ),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          type: "ai",
          text: "Network error – please try again.".replace(/^\s+/, ""),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Companion</Text>
          <Text style={styles.subtext}>
            A gentle space to talk about how you’re feeling
          </Text>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            paddingBottom: barHeight + insets.bottom + 16,
          }}
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

          {loading && (
            <View style={[styles.messageRow, styles.rowLeft]}>
              <View style={styles.avatar}>
                <Ionicons name="sparkles" size={20} color="#6c63ff" />
              </View>
              <View style={[styles.message, styles.aiMessage]}>
                <ActivityIndicator size="small" color="#6c63ff" />
              </View>
            </View>
          )}

          <Text style={styles.footerNote}>
            BreatheWell is here to support you.
          </Text>
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            ref={inputRef}
            placeholder="How are you feeling?"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={input}
            onChangeText={setInput}
            editable={!loading}
            onLayout={(e) => setBarHeight(e.nativeEvent.layout.height)}
          />

          <TouchableOpacity
            style={styles.sendButton}
            disabled={loading || !input.trim()}
            onPress={sendMessage}
            accessibilityLabel="Send message"
          >
            <Ionicons
              name="send"
              size={20}
              color={loading || !input.trim() ? "#ccc" : "#6c63ff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    bottom: 100,
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
