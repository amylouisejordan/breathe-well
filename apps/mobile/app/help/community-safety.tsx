import { Text, StyleSheet } from "react-native";
import HelpArticle from "./_article";

export default function CommunitySafety() {
  return (
    <HelpArticle title="Staying safe in the community">
      <Text style={styles.paragraph}>
        Living with COPD can make busy environments feel overwhelming. These tips
        can help you stay safe and confident when you`re out and about.
      </Text>

      <Text style={styles.step}>• Carry your reliever inhaler with you</Text>
      <Text style={styles.step}>• Avoid smoky or polluted areas when possible</Text>
      <Text style={styles.step}>• Take breaks if you feel breathless</Text>
      <Text style={styles.step}>• Let someone know if you`re feeling unwell</Text>
      <Text style={styles.step}>• Keep your phone charged in case you need help</Text>

      <Text style={styles.paragraph}>
        If you ever feel very unwell or unsafe, reach out to someone you trust or
        contact local services who can help you right away.
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
