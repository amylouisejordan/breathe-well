import { useAuth } from "@/app/utils/useAuth";
import {
  Stack,
  useRootNavigationState,
  useNavigationContainerRef,
} from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

const Splash = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator />
  </View>
);

const RootLayout = () => {
  const { user, loading } = useAuth();
  const rootState = useRootNavigationState();
  const navRef = useNavigationContainerRef();

  useEffect(() => {
    if (!navRef?.isReady()) return;

    if (!loading && !user) {
      navRef.navigate("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user, rootState?.key]);

  if (loading || !rootState) return <Splash />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(forum)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayout;
