import {
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router/build/useNavigation";
import { useAuth } from "../utils/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Avatar,
  Container,
  FooterNote,
  Header,
  Input,
  InputBar,
  Message,
  MessageRow,
  MessageText,
  SendButton,
  Subtext,
  Title,
} from "./styled";

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
    const text = input.trim();
    if (!text || loading) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoading(true);
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
      <Container>
        <Header>
          <Title>AI Companion</Title>
          <Subtext>A gentle space to talk about how you’re feeling</Subtext>
        </Header>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            paddingBottom: barHeight + insets.bottom + 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <MessageRow
              key={msg.id}
              side={msg.type === "user" ? "right" : "left"}
            >
              {msg.type === "ai" && (
                <Avatar>
                  <Ionicons name="sparkles" size={20} color="#6c63ff" />
                </Avatar>
              )}

              <Message user={msg.type === "user"}>
                <MessageText user={msg.type === "user"}>{msg.text}</MessageText>
              </Message>

              {msg.type === "user" && (
                <Avatar user>
                  <Ionicons name="person" size={20} color="#fff" />
                </Avatar>
              )}
            </MessageRow>
          ))}

          {loading && (
            <MessageRow side="left">
              <Avatar>
                <Ionicons name="sparkles" size={20} color="#6c63ff" />
              </Avatar>
              <Message>
                <ActivityIndicator size="small" color="#6c63ff" />
              </Message>
            </MessageRow>
          )}

          <FooterNote>BreatheWell is here to support you.</FooterNote>
        </ScrollView>

        <InputBar>
          <Input
            ref={inputRef}
            placeholder={`Hi ${firstName}, how are you feeling?`}
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
            editable={!loading}
            onLayout={(e: LayoutChangeEvent) =>
              setBarHeight(e.nativeEvent.layout.height)
            }
          />

          <SendButton
            onPress={sendMessage}
            disabled={loading || !input.trim()}
            accessibilityLabel="Send message"
          >
            <Ionicons
              name="send"
              size={20}
              color={loading || !input.trim() ? "#ccc" : "#6c63ff"}
            />
          </SendButton>
        </InputBar>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AiScreen;
