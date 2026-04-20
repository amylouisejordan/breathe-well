import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "expo-router";

import { Container, Title, Subtext } from "./history/styled";
import { Card, Row, Avatar, AvatarText } from "./(forum)/styled";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !pass) {
      Alert.alert("Oops", "Email and password can't be empty.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, pass);
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
      }
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Error", err.message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "100%", alignItems: "center" }}
      >
        <Avatar
          style={{
            backgroundColor: "#f3f0ff",
            marginBottom: 12,
            width: 80,
            height: 80,
            borderRadius: 40,
          }}
        >
          <AvatarText style={{ color: "#6c63ff", fontSize: 32 }}>
            {isRegister ? "👋" : "🔐"}
          </AvatarText>
        </Avatar>

        <Title>{isRegister ? "Create account" : "Welcome back"}</Title>
        <Subtext style={{ marginBottom: 24 }}>
          {isRegister
            ? "Join the community and start breathing easier"
            : "You’re among friends here – log in to continue"}
        </Subtext>

        <Card
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#eee",
            borderRadius: 14,
            padding: 20,
          }}
        >
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
              fontSize: 16,
              backgroundColor: "#fafafa",
            }}
          />
          <TextInput
            placeholder="Password"
            value={pass}
            onChangeText={setPass}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 12,
              marginBottom: 20,
              fontSize: 16,
              backgroundColor: "#fafafa",
            }}
          />

          <Pressable
            onPress={handleAuth}
            disabled={loading}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#5b54e3" : "#6c63ff",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              opacity: loading ? 0.6 : 1,
            })}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              {loading ? "Working…" : isRegister ? "Create account" : "Sign in"}
            </Text>
          </Pressable>

          <Row style={{ marginTop: 16, justifyContent: "center" }}>
            <Text style={{ color: "#666" }}>
              {isRegister ? "Already a member?" : "New here?"}{" "}
            </Text>
            <Pressable onPress={() => setIsRegister((v) => !v)}>
              <Text
                style={{
                  color: "#6c63ff",
                  fontWeight: "700",
                }}
              >
                {isRegister ? "Login" : "Register"}
              </Text>
            </Pressable>
          </Row>
        </Card>
      </KeyboardAvoidingView>
    </Container>
  );
}
