import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useState } from "react";

const TAGS = ["Breathless", "Wheezy", "Tight chest", "Cough", "Fatigue"];

const AddSymptomForm = () => {
  const [severity, setSeverity] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const severityLabel =
    severity <= 3 ? "Mild" : severity <= 6 ? "Moderate" : "Severe";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Symptom</Text>
      <Text style={styles.subtitle}>How are you feeling right now?</Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Severity: <Text style={styles.severity}>{severityLabel}</Text>
        </Text>

        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={severity}
          onValueChange={setSeverity}
          minimumTrackTintColor="#6c63ff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#6c63ff"
        />

        <Text style={[styles.label, { marginTop: 20 }]}>Symptoms</Text>

        <View style={styles.tagWrap}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagActive,
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextActive,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Notes</Text>
        <TextInput
          placeholder="Anything else you want to add?"
          placeholderTextColor="#aaa"
          style={[styles.input, styles.textArea]}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Symptom</Text>
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
  severity: {
    color: "#6c63ff",
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#f1f0ff",
  },
  tagActive: {
    backgroundColor: "#6c63ff",
  },
  tagText: {
    fontSize: 13,
    color: "#6c63ff",
    fontWeight: "500",
  },
  tagTextActive: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
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

export default AddSymptomForm;
