import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddEntry = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Entry</Text>
      <Text style={styles.subtitle}>
        Take a moment to record how you’re doing today
      </Text>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => router.push("/add-symptom-form")}
        accessibilityRole="button"
        accessibilityLabel="Log a symptom"
      >
        <View style={styles.iconWrap}>
          <Ionicons name="pulse" size={30} color="#6c63ff" />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.optionTitle}>Symptom</Text>
          <Text style={styles.optionText}>
            Track breathlessness, mood, or changes in how you feel
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionCard}
        onPress={() => router.push("/add-medication-form")}
        accessibilityRole="button"
        accessibilityLabel="Log medication"
      >
        <View style={styles.iconWrap}>
          <Ionicons name="medkit" size={28} color="#6c63ff" />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.optionTitle}>Medication</Text>
          <Text style={styles.optionText}>
            Record medication taken, dosage, or timing
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancel}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Cancel and go back"
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#f1f0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  textWrap: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  optionText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  cancel: {
    marginTop: "auto",
    alignItems: "center",
    paddingVertical: 14,
  },
  cancelText: {
    color: "#999",
    fontSize: 16,
  },
});

export default AddEntry;
