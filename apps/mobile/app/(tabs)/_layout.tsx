import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useAuth } from "../utils/useAuth";
import { AddButton, Bell, Content, Dot, Greeting, Subline } from "./styled";

const CustomHeader = () => {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] ?? user?.email ?? "friend";

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const screenWidth = Dimensions.get("window").width;

  const topPadding = Platform.OS === "ios" ? 44 : StatusBar.currentHeight ?? 0;

  return (
    <View
      style={{
        width: "100%",
        paddingTop: topPadding,
        paddingBottom: 10,
      }}
    >
      <LinearGradient
        colors={["#6c63ff", "#726dff", "#8a84ff"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Svg
        height={100}
        width={screenWidth * 2}
        viewBox="0 0 1440 320"
        style={{
          position: "absolute",
          bottom: 0,
          left: -screenWidth * 0.5,
        }}
      >
        <Path
          fill="#6c63ff"
          d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,229.3C672,256,768,256,864,240C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>
      <Content>
        <View style={{ flex: 1 }}>
          <Greeting>
            {greeting}, {firstName} 👋
          </Greeting>
          <Subline>Breathe well, feel better</Subline>
        </View>

        <Bell
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <Dot />
        </Bell>
      </Content>
    </View>
  );
};

const TabIcon = ({
  name,
  color,
  size,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
}) => <Ionicons name={name} size={size} color={color} />;

const TabsLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <CustomHeader />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          sceneStyle: { backgroundColor: "#F7F9FC" },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#6c63ff",
          tabBarInactiveTintColor: "#A0A3BD",
          tabBarStyle: {
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            height: 64,
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            borderTopWidth: 0,
            shadowColor: "#6c63ff",
            shadowOpacity: 0.15,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
            paddingHorizontal: 8,
          },
          tabBarItemStyle: {
            paddingTop: 12,
            paddingBottom: 12,
            height: 64,
            alignItems: "center",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "sparkles";

            switch (route.name) {
              case "ai":
                iconName = "sparkles";
                break;
              case "community":
                iconName = "chatbubbles";
                break;
              case "history":
                iconName = "stats-chart";
                break;
              case "profile":
                iconName = "person";
                break;
            }

            return (
              <TabIcon
                name={iconName}
                color={color}
                size={focused ? size + 2 : size}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="ai" />
        <Tabs.Screen name="community" />
        <Tabs.Screen
          name="add-placeholder"
          options={{
            tabBarButton: () => (
              <AddButton onPress={() => router.push("/(modals)/add-entry")}>
                <Ionicons name="add" size={32} color="#fff" />
              </AddButton>
            ),
          }}
        />

        <Tabs.Screen name="history" />

        <Tabs.Screen name="profile" />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
