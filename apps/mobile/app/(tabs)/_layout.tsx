import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useAuth } from "../utils/useAuth";
import {
  AddButton,
  Content,
  Greeting,
  Overlay,
  Pill,
  PillText,
  SheetGradient,
  Subline,
} from "./styled";

const screenWidth = Dimensions.get("window").width;
const topPadding = Platform.OS === "ios" ? 44 : StatusBar.currentHeight ?? 0;

const CustomHeader = () => {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] ?? user?.email ?? "friend";

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <View
        style={{ width: "100%", paddingTop: topPadding, paddingBottom: 10 }}
      >
        <LinearGradient
          colors={["#4A90E2", "#5AA0F0", "#6BB0FF"]}
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
            fill="#4a90e2"
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

          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setMenuVisible(true);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </Content>
      </View>

      <Modal
        transparent
        animationType="slide"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <Overlay>
            <TouchableWithoutFeedback>
              <SheetGradient colors={["#4a90e2", "#726dff", "#8a84ff"]}>
                {[
                  {
                    label: "Notifications",
                    target: "/notifications",
                    icon: "notifications-outline",
                  },
                  {
                    label: "Profile",
                    target: "/profile",
                    icon: "person-outline",
                  },
                ].map(({ label, target, icon }) => (
                  <Pill
                    key={label}
                    onPress={() => {
                      setMenuVisible(false);
                      router.push(target as any);
                    }}
                  >
                    <Ionicons name={icon as any} size={20} color="#fff" />
                    <PillText>{label}</PillText>
                  </Pill>
                ))}
              </SheetGradient>
            </TouchableWithoutFeedback>
          </Overlay>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
          tabBarActiveTintColor: "#4a90e2",
          tabBarInactiveTintColor: "#A0A3BD",
          tabBarStyle: {
            position: "absolute",
            bottom: -30,
            left: 16,
            right: 16,
            height: 70,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            shadowColor: "#4a90e2",
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
              case "articles":
                iconName = "newspaper";
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
        <Tabs.Screen name="articles" />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
