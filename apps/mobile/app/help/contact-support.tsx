import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import HelpArticle from "./_article";

export default function ContactSupport() {
  const sendEmail = () => {
    const subject = encodeURIComponent("BreatheWell Support Request");
    const body = encodeURIComponent(
      "Hi BreatheWell team,\n\nI need help with..."
    );
    Linking.openURL(
      `mailto:support@breathewell.app?subject=${subject}&body=${body}`
    );
  };

  return (
    <HelpArticle title="Contact support">
      <Text style={styles.paragraph}>
        If something isn’t working or you need help, we’re here for you.
      </Text>

      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Send email to support</Text>
      </TouchableOpacity>
    </HelpArticle>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6c63ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
