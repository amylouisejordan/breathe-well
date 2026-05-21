import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Card, Container, DeleteButton, Input, Label, SaveButtonText, Subtitle, Title } from "./styled";

const EditMedication = () => {
  const params = useLocalSearchParams();
  const list = JSON.parse(params.list as string);

  const id = Number(params.id);

  const [name, setName] = useState(params.name as string);
  const [dosage, setDosage] = useState(params.dosage as string);
  const [notes, setNotes] = useState(params.notes as string);

  const handleSave = () => {
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
      <Title>Edit Medication</Title>
      <Subtitle>Update or remove this medication</Subtitle>

      <Card>
        <Label>Medication name</Label>
        <Input value={name} onChangeText={setName} />

        <Label>Default dosage</Label>
        <Input
          value={dosage}
          onChangeText={setDosage}
        />

        <Label>Notes</Label>
        <Input value={notes} onChangeText={setNotes} />
      </Card>

      <DeleteButton onPress={handleDelete}>
        <Ionicons name="trash" size={20} color="#fff" />
        <SaveButtonText>Delete Medication</SaveButtonText>
      </DeleteButton>

      <Button onPress={handleSave}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <SaveButtonText>Save Changes</SaveButtonText>
      </Button>
    </Container>
  );
};

export default EditMedication;
