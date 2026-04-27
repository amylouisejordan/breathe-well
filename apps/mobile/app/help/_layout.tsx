import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function HelpStack() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Help & Support",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="how-to-log-symptoms"
        options={{
          title: "How to log symptoms",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="how-to-log-medication"
        options={{
          title: "How to log medication",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="using-ai"
        options={{
          title: "Using the AI companion",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="community-safety"
        options={{
          title: "Community safety",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="data-privacy"
        options={{
          title: "Data privacy",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="editing-entries"
        options={{
          title: "Editing entries",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="changing-preferences"
        options={{
          title: "Changing preferences",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="contact-support"
        options={{
          title: "Contact support",
          headerLeft: () => (
            <TouchableOpacity onPress={router.back} hitSlop={10}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
