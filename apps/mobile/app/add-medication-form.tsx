import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { load, save } from "./utils/storage";

const AddMedicationForm = () => {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName("");
    setDose("");
    setNotes("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Log Medication
        </Text>
        <Text style={styles.subtitle}>What medication did you take today?</Text>

        <View style={styles.divider} />

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Medication name</Text>
            <TextInput
              placeholder="e.g. Salbutamol inhaler"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
              accessibilityLabel="Medication name"
              accessibilityHint="Enter the name of the medication you took"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Dosage</Text>
            <TextInput
              placeholder="e.g. 2 puffs"
              placeholderTextColor="#999"
              style={styles.input}
              value={dose}
              onChangeText={setDose}
              accessibilityLabel="Dosage"
              accessibilityHint="Enter how much medication you took"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              placeholder="Add anything you'd like to remember"
              placeholderTextColor="#999"
              style={[styles.input, styles.textArea]}
              multiline
              value={notes}
              onChangeText={setNotes}
              accessibilityLabel="Notes"
              accessibilityHint="Add any extra details about your medication"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetForm}
          accessibilityRole="button"
          accessibilityLabel="Reset form"
          activeOpacity={0.7}
        >
          <Ionicons name="refresh" size={18} color="#6c63ff" />
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const existing = (await load("medications")) || [];

            const newEntry = {
              name,
              dose,
              notes,
              date: new Date().toISOString(),
            };

            await save("medications", [...existing, newEntry]);

            router.back();
          }}
          accessibilityRole="button"
          accessibilityLabel="Save medication entry"
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark" size={22} color="#fff" />
          <Text style={styles.buttonText}>Save Medication</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Keeping track of your medication helps you stay on top of your health
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6c63ff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
    gap: 6,
  },
  resetText: {
    color: "#6c63ff",
    fontSize: 15,
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

  footerNote: {
    textAlign: "center",
    fontSize: 13,
    color: "#999",
    marginTop: 12,
  },
});

export default AddMedicationForm;
