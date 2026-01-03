import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddMedicationForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Medication</Text>
      <Text style={styles.subtitle}>Record medication you’ve taken</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Medication name</Text>
        <TextInput
          placeholder="e.g. Salbutamol"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Text style={styles.label}>Dosage</Text>
        <TextInput
          placeholder="e.g. 2 puffs"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          placeholder="Optional notes"
          placeholderTextColor="#aaa"
          style={[styles.input, styles.textArea]}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Medication</Text>
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddMedicationForm;
