import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

const NotificationsScreen = () => {
  const [symptomReminder, setSymptomReminder] = useState(true);
  const [medicationReminder, setMedicationReminder] = useState(false);
  const [aiCheckins, setAiCheckins] = useState(true);
  const [communityReplies, setCommunityReplies] = useState(true);
  const [newPosts, setNewPosts] = useState(false);
  const [quietHours, setQuietHours] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>
          Choose the reminders that feel helpful for your routine
        </Text>

        {/* Health Reminders */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Health reminders</Text>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>Daily symptom reminder</Text>
            <Switch
              value={symptomReminder}
              onValueChange={setSymptomReminder}
              thumbColor="#6c63ff"
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>Medication reminders</Text>
            <Switch
              value={medicationReminder}
              onValueChange={setMedicationReminder}
              thumbColor="#6c63ff"
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>AI companion check‑ins</Text>
            <Switch
              value={aiCheckins}
              onValueChange={setAiCheckins}
              thumbColor="#6c63ff"
            />
          </View>
        </View>

        {/* Community */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Community</Text>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>Replies to your posts</Text>
            <Switch
              value={communityReplies}
              onValueChange={setCommunityReplies}
              thumbColor="#6c63ff"
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>New posts in followed topics</Text>
            <Switch
              value={newPosts}
              onValueChange={setNewPosts}
              thumbColor="#6c63ff"
            />
          </View>
        </View>

        {/* Quiet Hours */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Quiet hours</Text>

          <View style={styles.toggleRow}>
            <Text style={styles.rowText}>Silence notifications at night</Text>
            <Switch
              value={quietHours}
              onValueChange={setQuietHours}
              thumbColor="#6c63ff"
            />
          </View>

          {quietHours && (
            <Text style={styles.quietHint}>
              Notifications will be paused between 10pm and 8am
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Save button fixed at bottom */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Save notification settings"
      >
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationsScreen;

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
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    paddingRight: 10,
  },
  quietHint: {
    fontSize: 13,
    color: "#777",
    marginTop: 10,
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
