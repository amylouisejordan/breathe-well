import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

const AddMedicationSettings = () => {
  const params = useLocalSearchParams();
  const existingList = JSON.parse(params.list as string);

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const newMed = {
      id: Date.now(),
      name,
      dosage,
      notes,
      type: "inhaler",
    };

    const updatedList = [...existingList, newMed];

    router.push({
      pathname: "/medications",
      params: { updatedList: JSON.stringify(updatedList) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medication</Text>
      <Text style={styles.subtitle}>
        Save a medication so you can select it quickly when logging
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Medication name</Text>
        <TextInput
          placeholder="e.g. Salbutamol"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Default dosage</Text>
        <TextInput
          placeholder="e.g. 2 puffs"
          style={styles.input}
          value={dosage}
          onChangeText={setDosage}
        />

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          placeholder="Colour, device, etc."
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationSettings;

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
    marginBottom: 36,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fafafa",
    marginBottom: 20,
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
