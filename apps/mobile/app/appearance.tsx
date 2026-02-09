import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

const THEMES = ["Light", "Dark", "High contrast"];
const TEXT_SIZES = ["Small", "Medium", "Large", "Extra large"];

const AppearanceScreen = () => {
  const [theme, setTheme] = useState("Light");
  const [textSize, setTextSize] = useState("Medium");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [calmingMode, setCalmingMode] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Appearance</Text>
        <Text style={styles.subtitle}>
          Make BreatheWell feel comfortable for your eyes and energy levels
        </Text>

        {/* Theme */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Theme</Text>

          {THEMES.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.row}
              onPress={() => setTheme(option)}
            >
              <Text style={styles.rowText}>{option}</Text>
              {theme === option && (
                <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Text Size */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Text size</Text>

          {TEXT_SIZES.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.row}
              onPress={() => setTextSize(option)}
            >
              <Text style={styles.rowText}>{option}</Text>
              {textSize === option && (
                <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Motion & Calming */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Comfort settings</Text>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>Reduce motion</Text>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              thumbColor="#6c63ff"
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>Calming mode</Text>
            <Switch
              value={calmingMode}
              onValueChange={setCalmingMode}
              thumbColor="#6c63ff"
            />
          </View>

          {calmingMode && (
            <Text style={styles.hint}>
              Calming mode softens colours and reduces visual noise
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Save button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Save appearance settings"
      >
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppearanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6c63ff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  hint: {
    fontSize: 13,
    color: "#777",
    marginTop: 10,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: "#6c63ff",
    paddingVertical: 16,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
