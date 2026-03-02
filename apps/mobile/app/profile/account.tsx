import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Manage Account
      </Text>
      <Text style={styles.subtext}>
        Update your personal details and account preferences
      </Text>

      <View style={styles.card}>
        <SettingRow
          icon="person-circle"
          label="Edit profile"
          hint="Update your name or details"
        />
        <SettingRow
          icon="mail"
          label="Change email"
          hint="Update your email address"
        />
        <SettingRow
          icon="key"
          label="Change password"
          hint="Update your password"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger zone</Text>
        <View style={styles.card}>
          <SettingRow
            icon="trash"
            label="Delete account"
            danger
            hint="Permanently remove your account"
          />
        </View>
      </View>
    </View>
  );
};

const SettingRow = ({
  icon,
  label,
  hint,
  danger,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  hint?: string;
  danger?: boolean;
}) => (
  <TouchableOpacity
    style={styles.row}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityHint={hint}
    activeOpacity={0.6}
  >
    <Ionicons
      name={icon}
      size={22}
      color={danger ? "#d9534f" : "#6c63ff"}
      style={styles.rowIcon}
    />
    <Text style={[styles.rowText, danger && styles.dangerText]}>{label}</Text>
    <Ionicons name="chevron-forward" size={18} color="#bbb" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafb",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6c63ff",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
    marginBottom: 28,
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
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d9534f",
    marginBottom: 12,
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

export default AccountScreen;
