import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

const HistoryScreen = () => {
  const [range, setRange] = useState<"day" | "week" | "month">("week");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtext}>
          View your symptoms and medication over time
        </Text>
      </View>

      <View style={styles.toggleRow}>
        {["day", "week", "month"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.toggle, range === item && styles.toggleActive]}
            onPress={() => setRange(item as any)}
          >
            <Text
              style={[
                styles.toggleText,
                range === item && styles.toggleTextActive,
              ]}
            >
              {item.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        <GraphPlaceholder label="Symptom intensity" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medication</Text>
        <GraphPlaceholder label="Medication taken" />
      </View>
    </View>
  );
};

type GraphPlaceholderProps = {
  label: string;
};

const GraphPlaceholder = (props: GraphPlaceholderProps) => {
  const { label } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.graphLabel}>{label}</Text>

      <View style={styles.barRow}>
        {[40, 70, 30, 80, 50, 65].map((height, index) => (
          <View key={index} style={[styles.bar, { height }]} />
        ))}
      </View>

      <Text style={styles.graphHint}>
        Placeholder graph - data will appear here
      </Text>
    </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6c63ff",
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  toggleRow: {
    flexDirection: "row",
    marginBottom: 28,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  toggle: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#6c63ff",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  toggleTextActive: {
    color: "#fff",
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
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  graphLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  barRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    gap: 8,
    marginBottom: 12,
  },
  bar: {
    flex: 1,
    backgroundColor: "#6c63ff",
    borderRadius: 6,
    opacity: 0.8,
  },
  graphHint: {
    fontSize: 12,
    color: "#999",
  },
});

export default HistoryScreen;
