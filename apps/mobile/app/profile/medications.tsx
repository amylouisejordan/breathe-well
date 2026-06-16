import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ButtonText,
  Card,
  CardMiddle,
  CardNotes,
  CardSub,
  CardTitle,
  Container,
  FloatingButton,
  IconWrap,
  Subtext,
  Title,
} from "./styled";

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
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title>My Medications</Title>
        <Subtext style={{ marginBottom: 0 }}>
          Save all your prescribed medications to make logging quicker and
          easier
        </Subtext>

        {medications.map((med) => (
          <Card
            key={med.id}
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
            <IconWrap>
              <Ionicons
                name={iconForType(med.type)}
                size={26}
                color="#4a90e2"
              />
            </IconWrap>

            <CardMiddle>
              <CardTitle>{med.name}</CardTitle>
              <CardSub>{med.dosage}</CardSub>
              {med.notes && <CardNotes>{med.notes}</CardNotes>}
            </CardMiddle>

            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </Card>
        ))}
      </ScrollView>

      <FloatingButton
        onPress={() =>
          router.push({
            pathname: "/add-medication-settings",
            params: { list: JSON.stringify(medications) },
          })
        }
      >
        <Ionicons name="add" size={24} color="#fff" />
        <ButtonText>Add Medication</ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default MyMedications;
