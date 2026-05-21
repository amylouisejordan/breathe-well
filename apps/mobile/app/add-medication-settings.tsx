import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Input,
  Label,
  SaveButtonText,
  Subtitle,
  Title,
} from "./styled";

const AddMedicationSettings = () => {
  const params = useLocalSearchParams();
  const existingList = JSON.parse(params.list as string);

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const newMed = {
      id: Date.now(),
      name,
      dosage,
      notes,
      type: "inhaler",
    };

    const updatedList = [...existingList, newMed];

    router.push({
      pathname: "/medications",
      params: { updatedList: JSON.stringify(updatedList) },
    });
  };

  return (
    <Container>
      <Title>Add Medication</Title>
      <Subtitle>
        Save a medication so you can select it quickly when logging
      </Subtitle>

      <Card>
        <Label>Medication name</Label>
        <Input
          placeholder="e.g. Salbutamol"
          value={name}
          onChangeText={setName}
        />

        <Label>Default dosage</Label>
        <Input
          placeholder="e.g. 2 puffs"
          value={dosage}
          onChangeText={setDosage}
        />

        <Label>Notes (optional)</Label>
        <Input
          placeholder="Colour, device, etc."
          value={notes}
          onChangeText={setNotes}
        />
      </Card>

      <Button onPress={handleSave}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <SaveButtonText>Save Medication</SaveButtonText>
      </Button>
    </Container>
  );
};

export default AddMedicationSettings;
