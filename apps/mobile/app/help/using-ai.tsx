import { Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function UsingAI() {
  return (
    <HelpArticle title="Using the AI companion">
      <Text style={styles.paragraph}>
        The AI companion is here to help you understand your symptoms,
        medication, and wellbeing. It can explain things in simple language and
        offer gentle guidance.
      </Text>

      <Text style={styles.step}>• Ask questions about symptoms</Text>
      <Text style={styles.step}>
        • Get explanations of inhalers and treatments
      </Text>
      <Text style={styles.step}>
        • Learn how to use the app more effectively
      </Text>
      <Text style={styles.step}>• Get emotional support and reassurance</Text>

      <Text style={styles.paragraph}>
        The AI companion is not a medical professional, but it can help you feel
        more confident and informed.
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
