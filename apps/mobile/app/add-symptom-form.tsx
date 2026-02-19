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

  const resetForm = () => {
    setSeverity(5);
    setSelectedTags([]);
    setNotes("");
  };

  const severityLabel =
    severity <= 3 ? "Mild" : severity <= 6 ? "Moderate" : "Severe";

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
          Log Symptom
        </Text>
        <Text style={styles.subtitle}>
          Take a moment to record how you’re feeling
        </Text>

        <View style={styles.divider} />

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
              accessibilityLabel="Symptom severity slider"
              accessibilityHint="Slide to set severity from 1 to 10"
            />
            <Text style={styles.severityNumber}>{severity}</Text>
          </View>

          <Text style={styles.scaleHint}>1 = very mild, 10 = very severe</Text>

          <Text style={[styles.label, { marginTop: 24 }]}>
            Symptoms{" "}
            {selectedTags.length > 0 && (
              <Text style={styles.tagCount}>({selectedTags.length} selected)</Text>
            )}
          </Text>

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
                accessibilityHint="Tap to select or deselect"
                activeOpacity={0.7}
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
            accessibilityLabel="Notes"
            accessibilityHint="Add any extra details about your symptoms"
          />
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
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Save symptom entry"
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark" size={22} color="#fff" />
          <Text style={styles.buttonText}>Save Symptom</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Logging regularly helps you notice patterns over time
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
  tagCount: {
    fontSize: 13,
    color: "#6c63ff",
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

export default AddSymptomForm;
