import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <View>
          <Text style={styles.name}>Welcome back</Text>
          <Text style={styles.subtext}>Your wellbeing and app settings</Text>
        </View>
      </View>

      <Section title="Health">
        <SettingRow
          icon="pulse"
          label="Symptom history"
          href="/history"
          danger={undefined}
        />
        <SettingRow
          icon="leaf"
          label="Breathing preferences"
          href="/breathing"
          danger={undefined}
        />
      </Section>

      <Section title="App">
        <SettingRow
          icon="notifications"
          label="Notifications"
          href="/notifications"
          danger={undefined}
        />
        <SettingRow
          icon="lock-closed"
          label="Privacy & data"
          href="/privacy"
          danger={undefined}
        />
        <SettingRow
          icon="color-palette"
          label="Appearance"
          href="/appearance"
          danger={undefined}
        />
      </Section>

      <Section title="Account">
        <SettingRow
          icon="help-circle"
          label="Help & support"
          href="/help"
          danger={undefined}
        />
        <SettingRow icon="log-out" label="Sign out" danger href={undefined} />
      </Section>
    </View>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

interface SettingRowProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  danger?: boolean;
  href?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  danger,
  href,
}) => {
  const RowContent = (
    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={22}
        color={danger ? "#d9534f" : "#6c63ff"}
        style={styles.rowIcon}
      />
      <Text
        style={[styles.rowText, danger && styles.dangerText]}
        accessibilityRole="text"
      >
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color="#bbb" />
    </View>
  );

  if (href) {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel={label}>
          {RowContent}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={label}>
      {RowContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6c63ff",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowIcon: {
    width: 28,
  },
  rowText: {
    flex: 1,
    fontSize: 17,
    color: "#333",
    marginLeft: 10,
  },
  dangerText: {
    color: "#d9534f",
  },
});

export default ProfileScreen;
