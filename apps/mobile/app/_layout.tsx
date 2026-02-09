import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="breathing-preferences"
        options={{ title: "Breathing Preferences" }}
      />
      <Stack.Screen name="medications" options={{ title: "My Medications" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy & Data" }} />
      <Stack.Screen name="appearance" options={{ title: "Appearance" }} />
      <Stack.Screen name="help" options={{ title: "Help & Support" }} />

      <Stack.Screen
        name="add-symptom"
        options={{ presentation: "modal", title: "Add Symptom" }}
      />
    </Stack>
  );
};

export default RootLayout;
