import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function ForumLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Forum",
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Post Details",
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
