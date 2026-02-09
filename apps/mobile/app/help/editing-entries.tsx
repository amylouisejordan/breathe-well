import { Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function EditingEntries() {
  return (
    <HelpArticle title="Editing or deleting entries">
      <Text style={styles.paragraph}>
        Mistakes happen — and that’s okay. You can edit or delete any symptom or
        medication entry you’ve logged.
      </Text>

      <Text style={styles.step}>1. Open your history screen</Text>
      <Text style={styles.step}>2. Tap the entry you want to change</Text>
      <Text style={styles.step}>3. Choose “Edit” or “Delete”</Text>

      <Text style={styles.paragraph}>
        Editing helps keep your records accurate and useful.
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
