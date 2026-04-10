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

const EditMedication = () => {
  const params = useLocalSearchParams();
  const list = JSON.parse(params.list as string);

  const id = Number(params.id);

  const [name, setName] = useState(params.name as string);
  const [dosage, setDosage] = useState(params.dosage as string);
  const [notes, setNotes] = useState(params.notes as string);

  const handleSave = () => {
    const updatedList = list.map((m: { id: number }) =>
      m.id === id ? { ...m, name, dosage, notes } : m
    );

    router.push({
      pathname: "/profile/medications",
      params: { updatedList: JSON.stringify(updatedList) },
    });
  };

  const handleDelete = () => {
    const updatedList = list.filter((m: { id: number }) => m.id !== id);

    router.push({
      pathname: "/profile/medications",
      params: { updatedList: JSON.stringify(updatedList) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Medication</Text>
      <Text style={styles.subtitle}>Update or remove this medication</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Medication name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Default dosage</Text>
        <TextInput
          style={styles.input}
          value={dosage}
          onChangeText={setDosage}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput style={styles.input} value={notes} onChangeText={setNotes} />
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash" size={20} color="#fff" />
        <Text style={styles.deleteText}>Delete Medication</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditMedication;

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
  deleteButton: {
    flexDirection: "row",
    backgroundColor: "#d9534f",
    paddingVertical: 14,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
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
