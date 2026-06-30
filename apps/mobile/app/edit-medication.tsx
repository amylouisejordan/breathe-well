import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  Container,
  DeleteButton,
  Input,
  Label,
  SaveButtonText,
  Subtitle,
  Title,
} from "./styled";

const EditMedication = () => {
  const params = useLocalSearchParams();
  const list = JSON.parse(params.list as string);

  const id = Number(params.id);

  const [name, setName] = useState(params.name as string);
  const [dosage, setDosage] = useState(params.dosage as string);
  const [notes, setNotes] = useState(params.notes as string);

  const handleSave = () => {
    if (!name.trim()) return;

    const updatedList = list.map((m: { id: number }) =>
      m.id === id ? { ...m, name, dosage, notes } : m
    );

    router.push({
      pathname: "/profile/medications",
      params: { updatedList: JSON.stringify(updatedList) },
    });
  };

  const handleDelete = () => {
    const updatedList = list.filter((m: { id: number }) => m.id !== id);

    router.push({
      pathname: "/profile/medications",
      params: { updatedList: JSON.stringify(updatedList) },
    });
  };

  return (
    <Container>
      <Title accessibilityRole="header">Edit Medication</Title>
      <Subtitle>Update or remove this medication</Subtitle>

      <Card>
        <Label
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Medication name
        </Label>
        <Input
          value={name}
          onChangeText={setName}
          accessible={true}
          accessibilityLabel="Medication name"
          accessibilityHint="Modify the explicit or brand name of this medication"
        />

        <Label
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Default dosage
        </Label>
        <Input
          value={dosage}
          onChangeText={setDosage}
          accessible={true}
          accessibilityLabel="Default dosage"
          accessibilityHint="Modify your baseline measurement intake volume details"
        />

        <Label
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Notes
        </Label>
        <Input
          value={notes}
          onChangeText={setNotes}
          accessible={true}
          accessibilityLabel="Notes"
          accessibilityHint="Modify clarifying physical descriptions or structural reminders"
        />
      </Card>

      <DeleteButton
        onPress={handleDelete}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${name || "this medication"}`}
        accessibilityHint="Permanently removes this medication item entry from your profile logs"
        accessibilityState={{ destructive: true }}
      >
        <Ionicons
          name="trash"
          size={20}
          color="#fff"
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        />
        <SaveButtonText
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Delete Medication
        </SaveButtonText>
      </DeleteButton>

      <Button
        onPress={handleSave}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Save Changes"
        accessibilityHint="Commits modifications onto your medication profile records and returns to management dashboard"
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
          Save Changes
        </SaveButtonText>
      </Button>
    </Container>
  );
};

export default EditMedication;
