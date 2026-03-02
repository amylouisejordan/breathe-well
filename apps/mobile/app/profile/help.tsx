import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>
          You’re not alone. Here are some ways we can help.
        </Text>

        {/* Quick Help */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Quick help</Text>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/how-to-log-symptoms")}
          >
            <Text style={styles.rowText}>How to log symptoms</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/how-to-log-medication")}
          >
            <Text style={styles.rowText}>How to log medication</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/using-ai")}
          >
            <Text style={styles.rowText}>Using the AI companion</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/community-safety")}
          >
            <Text style={styles.rowText}>Staying safe in the community</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Frequently asked questions</Text>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/data-privacy")}
          >
            <Text style={styles.rowText}>Is my data private?</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/editing-entries")}
          >
            <Text style={styles.rowText}>Can I edit or delete entries?</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/changing-preferences")}
          >
            <Text style={styles.rowText}>How do I change my preferences?</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Contact support</Text>

          <Text style={styles.paragraph}>
            If something isn’t working or you need help, you can reach us at:
          </Text>

          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push("/help/contact-support")}
          >
            <Text style={[styles.rowText, styles.linkText]}>
              support@breathewell.app
            </Text>
            <Ionicons name="open-outline" size={20} color="#6c63ff" />
          </TouchableOpacity>
        </View>

        {/* Crisis Guidance */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>If you need urgent help</Text>

          <Text style={styles.paragraph}>
            BreatheWell cannot provide medical or emergency support. If you’re
            feeling very unwell, distressed, or unsafe, please reach out to a
            trusted person or local services who can help you right away.
          </Text>
        </View>
      </ScrollView>

      {/* Back button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpScreen;

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
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: "#444",
    marginBottom: 12,
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  linkText: {
    color: "#6c63ff",
    fontWeight: "600",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
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
