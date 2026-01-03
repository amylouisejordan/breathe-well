import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, StyleSheet } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        headerTitle: () => (
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 120, height: 32, resizeMode: "contain" }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="ai"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="forum"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-placeholder"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => router.push("/add-symptom")}
              style={styles.addButton}
              accessibilityLabel="Add symptom"
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
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
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
