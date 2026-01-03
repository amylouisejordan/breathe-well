import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="add-symptom"
        options={{
          presentation: "modal",
          title: "Add Symptom",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
