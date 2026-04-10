import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

import { load, save } from "../utils/storage";

import {
  Container,
  ScrollArea,
  Title,
  Subtitle,
  Divider,
  AnimatedCardWrapper,
  Card,
  Label,
  Input,
  TextArea,
  AnimatedPressWrapper,
  ResetButton,
  ResetText,
  SaveButton,
  SaveButtonText,
  FooterNote,
} from "../styled";

const AddMedicationForm = () => {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName("");
    setDose("");
    setNotes("");
  };

  const saveEntry = async () => {
    const existing = (await load("medications")) || [];

    const newEntry = {
      name,
      dose,
      notes,
      date: new Date().toISOString(),
    };

    await save("medications", [...existing, newEntry]);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Add Medication" }} />
      <Container>
        <ScrollArea showsVerticalScrollIndicator={false}>
          <Title>Log Medication</Title>
          <Subtitle>What medication did you take today?</Subtitle>

          <Divider />

          <AnimatedCardWrapper delay={150}>
            <Card>
              <Label>Medication name</Label>
              <Input
                placeholder="e.g. Salbutamol inhaler"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={250}>
            <Card>
              <Label>Dosage</Label>
              <Input
                placeholder="e.g. 2 puffs"
                placeholderTextColor="#999"
                value={dose}
                onChangeText={setDose}
              />
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={350}>
            <Card>
              <Label>Notes</Label>
              <TextArea
                placeholder="Add anything you'd like to remember"
                placeholderTextColor="#999"
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </Card>
          </AnimatedCardWrapper>

          <AnimatedPressWrapper>
            <ResetButton onPress={resetForm}>
              <Ionicons name="refresh" size={18} color="#6c63ff" />
              <ResetText>Reset</ResetText>
            </ResetButton>
          </AnimatedPressWrapper>

          <AnimatedPressWrapper>
            <SaveButton onPress={saveEntry}>
              <Ionicons name="checkmark" size={22} color="#fff" />
              <SaveButtonText>Save Medication</SaveButtonText>
            </SaveButton>
          </AnimatedPressWrapper>

          <FooterNote>
            Keeping track of your medication helps you stay on top of your
            health
          </FooterNote>
        </ScrollArea>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AddMedicationForm;
