import { Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function HowToLogMedication() {
  return (
    <HelpArticle title="How to log medication">
      <Text style={styles.paragraph}>
        Logging your medication helps you keep track of how often you use your
        inhalers, tablets, or capsules. It can also help you notice patterns and
        share accurate information with your healthcare team.
      </Text>

      <Text style={styles.step}>1. Open the Medication tab</Text>
      <Text style={styles.step}>2. Tap “Add medication entry”</Text>
      <Text style={styles.step}>
        3. Choose a saved medication from your list, or type one manually
      </Text>
      <Text style={styles.step}>
        4. Adjust the dosage if it’s different from your usual amount
      </Text>
      <Text style={styles.step}>5. Add any notes you want to remember</Text>
      <Text style={styles.step}>6. Save your entry</Text>

      <Text style={styles.paragraph}>
        You can view all your medication logs in the Medication History screen.
        This helps you understand your routine and spot changes over time.
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
