import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Your Profile</Text>
          <Text style={styles.subtext}>Manage your health & app settings</Text>
        </View>
      </View>

      <Section title="Health">
        <SettingRow icon="pulse" label="Symptom history" />
        <SettingRow icon="leaf" label="Breathing preferences" />
      </Section>

      <Section title="App">
        <SettingRow icon="notifications" label="Notifications" />
        <SettingRow icon="lock-closed" label="Privacy & data" />
        <SettingRow icon="color-palette" label="Appearance" />
      </Section>

      <Section title="Account">
        <SettingRow icon="help-circle" label="Help & support" />
        <SettingRow icon="log-out" label="Sign out" danger />
      </Section>
    </View>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = (props: SectionProps) => {
  const { title, children } = props;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
};

type SettingRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
};

const SettingRow = (props: SettingRowProps) => {
  const { icon, label, danger } = props;

  return (
    <TouchableOpacity style={styles.row}>
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#e57373" : "#6c63ff"}
        style={styles.rowIcon}
      />
      <Text style={[styles.rowText, danger && styles.dangerText]}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#bbb" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6c63ff",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowIcon: {
    width: 28,
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  dangerText: {
    color: "#e57373",
  },
});

export default ProfileScreen;
