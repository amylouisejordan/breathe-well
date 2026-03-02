import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

const MyMedications = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Salbutamol",
      dosage: "2 puffs",
      notes: "Blue inhaler (reliever)",
      type: "inhaler",
    },
    {
      id: 2,
      name: "Tiotropium",
      dosage: "1 capsule",
      notes: "Spiriva HandiHaler",
      type: "capsule",
    },
  ]);

  // Receive updates from Add/Edit screens
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.updatedList) {
      setMedications(JSON.parse(params.updatedList as string));
    }
  }, [params.updatedList]);

  const iconForType = (type: string) => {
    switch (type) {
      case "inhaler":
        return "color-filter";
      case "tablet":
        return "tablet-portrait";
      case "capsule":
        return "ellipse";
      default:
        return "medkit";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>My Medications</Text>
        <Text style={styles.subtitle}>
          Save all your prescribed medications to make logging quicker and
          easier
        </Text>

        {medications.map((med) => (
          <TouchableOpacity
            key={med.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/edit-medication",
                params: {
                  id: med.id,
                  name: med.name,
                  dosage: med.dosage,
                  notes: med.notes,
                  type: med.type,
                  list: JSON.stringify(medications),
                },
              })
            }
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={iconForType(med.type)}
                size={26}
                color="#6c63ff"
              />
            </View>

            <View style={styles.cardMiddle}>
              <Text style={styles.cardTitle}>{med.name}</Text>
              <Text style={styles.cardSub}>{med.dosage}</Text>
              {med.notes && <Text style={styles.cardNotes}>{med.notes}</Text>}
            </View>

            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/add-medication-settings",
            params: { list: JSON.stringify(medications) },
          })
        }
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyMedications;

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconWrap: {
    width: 40,
    alignItems: "center",
    marginRight: 12,
  },
  cardMiddle: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  cardSub: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  cardNotes: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
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
