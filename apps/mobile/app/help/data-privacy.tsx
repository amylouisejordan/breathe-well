import { Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function DataPrivacy() {
  return (
    <HelpArticle title="Is my data private?">
      <Text style={styles.paragraph}>
        Your wellbeing data is personal, and we treat it with care. BreatheWell
        stores your information securely and never shares it without your
        permission.
      </Text>

      <Text style={styles.step}>
        • Your logs stay on your device unless you sync them
      </Text>
      <Text style={styles.step}>• You control what you share</Text>
      <Text style={styles.step}>• You can delete your data at any time</Text>

      <Text style={styles.paragraph}>
        For full details, visit the Privacy & Data section in your app settings.
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
