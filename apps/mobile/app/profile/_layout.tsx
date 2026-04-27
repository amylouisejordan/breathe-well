import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function ProfileTabLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Help & Support",
        headerLeft: () => (
          <TouchableOpacity onPress={router.back} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "reidowxs" }}
      />

      <Stack.Screen
        name="how-to-log-symptoms"
        options={{
          title: "How to log syijouytfgmptoms",
          headerBackTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="how-to-log-medication"
        options={{ title: "How to log medication" }}
      />
      <Stack.Screen
        name="using-ai"
        options={{ title: "Using the AI companion" }}
      />
      <Stack.Screen
        name="community-safety"
        options={{ title: "Community safety" }}
      />
      <Stack.Screen name="data-privacy" options={{ title: "Data privacy" }} />
      <Stack.Screen
        name="editing-entries"
        options={{ title: "Editing entries" }}
      />
      <Stack.Screen
        name="changing-preferences"
        options={{ title: "Changing preferences" }}
      />
      <Stack.Screen
        name="contact-support"
        options={{ title: "Contact support" }}
      />
    </Stack>
  );
}
