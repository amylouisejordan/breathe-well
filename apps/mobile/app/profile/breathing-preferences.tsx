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
  
  const BREATHING_STYLES = [
    "Pursed‑lip breathing",
    "Diaphragmatic breathing",
    "Box breathing",
    "No exercises",
  ];
  
  const CHECKIN_OPTIONS = ["Never", "Daily", "Twice daily", "With symptoms"];
  
  const BREATHING_PACE = ["Slow", "Standard", "Slightly faster"];
  
  const EXERCISE_DURATION = ["1 minute", "3 minutes", "5 minutes", "Choose each time"];
  
  const ENCOURAGEMENT_STYLE = [
    "Gentle and reassuring",
    "Practical and direct",
    "Motivational",
    "Quiet (minimal messages)",
  ];
  
  const BreathingPreferences = () => {
    const [style, setStyle] = useState("Pursed‑lip breathing");
    const [checkins, setCheckins] = useState("Daily");
    const [pace, setPace] = useState("Slow");
    const [duration, setDuration] = useState("3 minutes");
    const [encouragement, setEncouragement] = useState("Gentle and reassuring");
  
    const [calmingAnimations, setCalmingAnimations] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);
  
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Breathing Preferences</Text>
          <Text style={styles.subtitle}>
            These settings help BreatheWell support you in a way that feels right for you
          </Text>
  
          {/* Breathing Style */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Breathing exercise style</Text>
  
            {BREATHING_STYLES.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.row}
                onPress={() => setStyle(option)}
              >
                <Text style={styles.rowText}>{option}</Text>
                {style === option && (
                  <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Breathing Pace */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Breathing pace</Text>
  
            {BREATHING_PACE.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.row}
                onPress={() => setPace(option)}
              >
                <Text style={styles.rowText}>{option}</Text>
                {pace === option && (
                  <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Exercise Duration */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Exercise duration</Text>
  
            {EXERCISE_DURATION.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.row}
                onPress={() => setDuration(option)}
              >
                <Text style={styles.rowText}>{option}</Text>
                {duration === option && (
                  <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Check‑ins */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>AI check‑in frequency</Text>
  
            {CHECKIN_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.row}
                onPress={() => setCheckins(option)}
              >
                <Text style={styles.rowText}>{option}</Text>
                {checkins === option && (
                  <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Encouragement Style */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Encouragement style</Text>
  
            {ENCOURAGEMENT_STYLE.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.row}
                onPress={() => setEncouragement(option)}
              >
                <Text style={styles.rowText}>{option}</Text>
                {encouragement === option && (
                  <Ionicons name="checkmark-circle" size={22} color="#6c63ff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Toggles */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Calming features</Text>
  
            <View style={styles.toggleRow}>
              <Text style={styles.rowText}>Show calming animations</Text>
              <Switch
                value={calmingAnimations}
                onValueChange={setCalmingAnimations}
                thumbColor="#6c63ff"
              />
            </View>
  
            <View style={styles.toggleRow}>
              <Text style={styles.rowText}>Reduce motion</Text>
              <Switch
                value={reduceMotion}
                onValueChange={setReduceMotion}
                thumbColor="#6c63ff"
              />
            </View>
          </View>
        </ScrollView>
  
        {/* Save button fixed at bottom */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Ionicons name="checkmark" size={22} color="#fff" />
          <Text style={styles.buttonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default BreathingPreferences;
  
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
    toggleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
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
  