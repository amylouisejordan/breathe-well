import { Stack } from "expo-router";

export default function ForumLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Forum",
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "Post Details" }} />
    </Stack>
  );
}
