import { View, Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function HowToLogSymptoms() {
  return (
    <HelpArticle title="How to log symptoms">
      <Text style={styles.paragraph}>
        Logging symptoms helps you spot patterns and understand how your COPD
        changes day‑to‑day.
      </Text>

      <Text style={styles.step}>1. Open the Symptoms tab</Text>
      <Text style={styles.step}>2. Tap “Add symptom”</Text>
      <Text style={styles.step}>3. Choose your symptoms from the list</Text>
      <Text style={styles.step}>4. Add any notes that feel important</Text>
      <Text style={styles.step}>5. Save your entry</Text>

      <Text style={styles.paragraph}>
        You can view your full history anytime in the Symptom History screen.
      </Text>
    </HelpArticle>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    color: "#444",
    marginBottom: 16,
    lineHeight: 22,
  },
  step: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
});
