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
  const [notes, setNotes] = useState("");

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
      <Text style={styles.subtitle}>
        Take a moment to record how you’re feeling
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Severity: <Text style={styles.severity}>{severityLabel}</Text>
        </Text>

        <View style={styles.sliderRow}>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={severity}
            onValueChange={setSeverity}
            minimumTrackTintColor="#6c63ff"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#6c63ff"
            style={{ flex: 1 }}
          />
          <Text style={styles.severityNumber}>{severity}</Text>
        </View>

        <Text style={styles.scaleHint}>1 = very mild, 10 = very severe</Text>

        <Text style={[styles.label, { marginTop: 24 }]}>Symptoms</Text>

        <View style={styles.tagWrap}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Tag: ${tag}`}
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

        <Text style={[styles.label, { marginTop: 24 }]}>Notes</Text>
        <TextInput
          placeholder="Add anything you’d like to remember"
          placeholderTextColor="#aaa"
          style={[styles.input, styles.textArea]}
          multiline
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Save symptom entry"
      >
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Symptom</Text>
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
  severity: {
    color: "#6c63ff",
    fontWeight: "700",
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  severityNumber: {
    width: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  scaleHint: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f1f0ff",
  },
  tagActive: {
    backgroundColor: "#6c63ff",
  },
  tagText: {
    fontSize: 14,
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
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
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

export default AddSymptomForm;
