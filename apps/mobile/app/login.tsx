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
import { Avatar, AvatarText, Card, Container, Row, Subtitle, Title } from "./styled";

const Login = () => {
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
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          <AvatarText style={{ color: "#4a90e2", fontSize: 32 }}>
            {isRegister ? "👋" : "🔐"}
          </AvatarText>
        </Avatar>

        <Title accessibilityRole="header">
          {isRegister ? "Create account" : "Welcome back"}
        </Title>
        <Subtitle style={{ marginBottom: 24 }}>
          {isRegister
            ? "Join the community and start breathing easier"
            : "You’re among friends here – log in to continue"}
        </Subtitle>

        <Card
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#F4D6D2",
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
            autoComplete="email"
            accessible={true}
            accessibilityLabel="Email address input"
            accessibilityHint="Type your profile communication email address account link"
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
            autoComplete="password"
            accessible={true}
            accessibilityLabel="Password input"
            accessibilityHint="Type the security code secret assigned onto this email profile account"
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

          <View
            accessibilityLiveRegion="assertive"
            importantForAccessibility="no"
            accessibilityElementsHidden={true}
            style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
          >
            <Text>
              {loading
                ? "Authentication process actively running, please hold"
                : ""}
            </Text>
          </View>

          <Pressable
            onPress={handleAuth}
            disabled={loading}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={
              isRegister
                ? "Submit creation profile details"
                : "Submit entry login criteria credentials"
            }
            accessibilityHint={
              isRegister
                ? "Submits account sign up configuration form"
                : "Authenticates details to sign into profile dashboard hub"
            }
            accessibilityState={{ busy: loading }}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#5b54e3" : "#4a90e2",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              opacity: loading ? 0.6 : 1,
            })}
          >
            <Text
              style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              {loading ? "Working…" : isRegister ? "Create account" : "Sign in"}
            </Text>
          </Pressable>

          <Row style={{ marginTop: 16, justifyContent: "center" }}>
            <Pressable
              onPress={() => setIsRegister((v) => !v)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                isRegister
                  ? "Already a member? Switch to standard login entry layout"
                  : "New here? Switch to registration account sign up input panel form layout"
              }
            >
              <Text style={{ color: "#666", textAlign: "center" }}>
                {isRegister ? "Already a member? Login" : "New here? Register"}
              </Text>
            </Pressable>
          </Row>
        </Card>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
