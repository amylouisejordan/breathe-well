import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddEntry = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Entry</Text>
      <Text style={styles.subtitle}>What would you like to log?</Text>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => {
          router.push("/add-symptom-form");
        }}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="pulse" size={28} color="#6c63ff" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.optionTitle}>Symptom</Text>
          <Text style={styles.optionText}>
            Track how you’re feeling and any changes today
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => {
          router.push("/add-medication-form");
        }}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="medkit" size={26} color="#6c63ff" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.optionTitle}>Medication</Text>
          <Text style={styles.optionText}>
            Log medication taken, dosage, or timing
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancel} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6c63ff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textWrap: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  optionText: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  cancel: {
    marginTop: "auto",
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelText: {
    color: "#999",
    fontSize: 15,
  },
});

export default AddEntry;
