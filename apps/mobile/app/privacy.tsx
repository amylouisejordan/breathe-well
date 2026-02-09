import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Privacy & Data</Text>
        <Text style={styles.subtitle}>
          Your information is yours. We keep it safe and transparent.
        </Text>

        {/* What we store */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>What BreatheWell stores</Text>

          <Text style={styles.paragraph}>
            BreatheWell only stores the information you choose to add:
          </Text>

          <View style={styles.bulletWrap}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Symptoms you log</Text>
          </View>

          <View style={styles.bulletWrap}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Medication entries</Text>
          </View>

          <View style={styles.bulletWrap}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Forum posts and replies</Text>
          </View>

          <View style={styles.bulletWrap}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Your breathing preferences</Text>
          </View>

          <View style={styles.bulletWrap}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Basic account details</Text>
          </View>
        </View>

        {/* How we use it */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>How your data is used</Text>

          <Text style={styles.paragraph}>
            Your data is used to personalise your experience and help you track
            your wellbeing over time. It is never sold or shared with third
            parties for advertising.
          </Text>

          <Text style={styles.paragraph}>
            You stay in control of what you add, edit, or delete.
          </Text>
        </View>

        {/* Download / Delete */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Your data tools</Text>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Download my data</Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={[styles.rowText, styles.dangerText]}>
              Delete my data
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>
        </View>

        {/* Privacy policy */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Privacy policy</Text>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>View full privacy policy</Text>
            <Ionicons name="open-outline" size={20} color="#6c63ff" />
          </TouchableOpacity>
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

export default PrivacyScreen;

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
  bulletWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: "#6c63ff",
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#444",
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
  dangerText: {
    color: "#d9534f",
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
