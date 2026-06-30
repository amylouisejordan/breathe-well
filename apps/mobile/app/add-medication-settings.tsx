import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
    if (!name.trim()) return;

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
      <Title accessibilityRole="header">Add Medication</Title>
      <Subtitle>
        Save a medication so you can select it quickly when logging
      </Subtitle>

      <Card>
        <Label
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Medication name
        </Label>
        <Input
          placeholder="e.g. Salbutamol"
          value={name}
          onChangeText={setName}
          accessible={true}
          accessibilityLabel="Medication name"
          accessibilityHint="Type the explicit or brand name of the prescribed medicine"
        />

        <Label
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Default dosage
        </Label>
        <Input
          placeholder="e.g. 2 puffs"
          value={dosage}
          onChangeText={setDosage}
          accessible={true}
          accessibilityLabel="Default dosage"
          accessibilityHint="Type your typical baseline measurement intake volume details"
        />

        <Label
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Notes (optional)
        </Label>
        <Input
          placeholder="Colour, device, etc."
          value={notes}
          onChangeText={setNotes}
          accessible={true}
          accessibilityLabel="Notes (optional)"
          accessibilityHint="Type clarifying physical descriptions, appearance markers, or reminders"
        />
      </Card>

      <Button
        onPress={handleSave}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Save Medication"
        accessibilityHint="Registers this item to your permanent medicine roster list and returns to management"
        accessibilityState={{ disabled: !name.trim() }}
      >
        <Ionicons
          name="checkmark"
          size={22}
          color="#fff"
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        />
        <SaveButtonText
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Save Medication
        </SaveButtonText>
      </Button>
    </Container>
  );
};

export default AddMedicationSettings;
