import { Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function ChangingPreferences() {
  return (
    <HelpArticle title="How to change your preferences">
      <Text style={styles.paragraph}>
        You can personalise BreatheWell to match your needs and comfort level.
      </Text>

      <Text style={styles.step}>1. Open the Profile tab</Text>
      <Text style={styles.step}>2. Tap “Breathing preferences”</Text>
      <Text style={styles.step}>3. Adjust your settings</Text>
      <Text style={styles.step}>4. Save your changes</Text>

      <Text style={styles.paragraph}>
        Your preferences help tailor the app to your breathing style and energy
        levels.
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
