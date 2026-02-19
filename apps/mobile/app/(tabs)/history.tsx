import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

const HistoryScreen = () => {
  const [range, setRange] = useState<"day" | "week" | "month">("week");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>
          Your Progress
        </Text>
        <Text style={styles.subtext}>
          A gentle look at how you’ve been feeling over time
        </Text>
        <Text style={styles.updatedText}>Last updated: today</Text>
      </View>

      <View style={styles.toggleRow}>
        {["day", "week", "month"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.toggle, range === item && styles.toggleActive]}
            onPress={() => setRange(item as any)}
            accessibilityRole="button"
            accessibilityLabel={`Show ${item} view`}
          >
            <Text
              style={[
                styles.toggleText,
                range === item && styles.toggleTextActive,
              ]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HistorySection title="Symptoms">
          <GraphPlaceholder label="Breathlessness & mood" />
        </HistorySection>

        <HistorySection title="Medication">
          <GraphPlaceholder label="Medication taken" />
        </HistorySection>
      </ScrollView>
    </View>
  );
};

const HistorySection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const GraphPlaceholder: React.FC<{ label: string }> = ({ label }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.graphLabel}>{label}</Text>

      <View style={styles.legendRow}>
        <View style={styles.legendDot} />
        <Text style={styles.legendText}>Your logged data</Text>
      </View>

      <View style={styles.graphArea}>
        <View style={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>

        <View style={styles.barRow}>
          {[40, 70, 30, 80, 50, 65].map((height, index) => (
            <View key={index} style={[styles.bar, { height }]} />
          ))}
        </View>
      </View>

      <Text style={styles.graphHint}>
        Your data will appear here as you log symptoms
      </Text>
    </View>
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
    marginBottom: 28,
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
  },
  updatedText: {
    fontSize: 13,
    color: "#999",
    marginTop: 6,
  },

  toggleRow: {
    flexDirection: "row",
    marginBottom: 32,
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
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#6c63ff",
  },
  toggleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  toggleTextActive: {
    color: "#fff",
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
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  graphLabel: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6c63ff",
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: "#666",
  },

  graphArea: {
    height: 140,
    marginBottom: 12,
    position: "relative",
  },

  grid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  gridLine: {
    height: 1,
    backgroundColor: "#eee",
  },

  barRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
    gap: 8,
  },
  bar: {
    flex: 1,
    backgroundColor: "#6c63ff",
    borderRadius: 6,
    opacity: 0.85,
  },

  graphHint: {
    fontSize: 13,
    color: "#999",
  },
});

export default HistoryScreen;
