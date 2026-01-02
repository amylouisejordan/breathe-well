import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 120, height: 32, resizeMode: "contain" }}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "ai") iconName = "sparkles";
          else if (route.name === "forum") iconName = "chatbubbles";
          else iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="ai" />
      <Tabs.Screen name="forum" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabsLayout;
