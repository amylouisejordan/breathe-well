import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = () => {
  const screenWidth = Dimensions.get("window").width;

  const topPadding = Platform.OS === "ios" ? 44 : StatusBar.currentHeight ?? 0;

  return (
    <View
      style={{
        width: "100%",
        paddingTop: topPadding,
        paddingBottom: 80,
      }}
    >
      <LinearGradient
        colors={["#6c63ff", "#726dff", "#8a84ff"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80 + topPadding,
        }}
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
      <View
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: 12,
          backgroundColor: "transparent",
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }}
      />

      <View
        style={{
          position: "absolute",
          top: topPadding + 12,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 140,
            height: 40,
            resizeMode: "contain",
          }}
        />
        <Text style={{ color: "#f0f0ff", fontSize: 12, marginTop: 4 }}>
          Breathe well, feel better
        </Text>
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          top: topPadding + 14,
          right: 16,
          padding: 8,
          borderRadius: 20,
        }}
      >
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <CustomHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: "#6c63ff" },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#6c63ff",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#ddd",
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 0,
            paddingBottom: 0,
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarIconStyle: {
            marginTop: 15,
            marginBottom: 0,
          },
        }}
      >
        <Tabs.Screen
          name="ai"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="sparkles"
                size={size}
                color={color}
                accessibilityLabel="AI companion"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="community"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="chatbubbles"
                size={size}
                color={color}
                accessibilityLabel="Community forum"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="add-placeholder"
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                onPress={() => router.push("/(modals)/add-entry")}
                style={styles.addButton}
                accessibilityLabel="Add entry"
              >
                <Ionicons name="add" size={32} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="stats-chart"
                size={size}
                color={color}
                accessibilityLabel="Symptom and Medication history"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person"
                size={size}
                color={color}
                accessibilityLabel="Profile"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -24,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});

export default TabsLayout;
