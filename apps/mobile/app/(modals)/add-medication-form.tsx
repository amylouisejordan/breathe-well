import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import * as Haptics from "expo-haptics";

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
  ResetButton,
  ResetText,
  SaveButton,
  SaveButtonText,
  FooterNote,
} from "../styled";
import { saveMedicationEntry } from "@/utils/loggingFirestore";

const AddMedicationForm = () => {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setName("");
    setDose("");
    setNotes("");
  };

  const saveEntry = async () => {
    if (!name.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    setSaving(true);
    try {
      await saveMedicationEntry({
        name: name.trim(),
        dose: dose.trim(),
        notes: notes.trim(),
        date: new Date().toISOString(),
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Oops", "Couldn't save – try again?");
    } finally {
      setSaving(false);
    }
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

          <Divider style={{ marginTop: 0 }} />

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

          <View>
            <ResetButton onPress={resetForm}>
              <Ionicons name="refresh" size={18} color="#6c63ff" />
              <ResetText>Reset</ResetText>
            </ResetButton>
          </View>

          <View style={{ marginTop: 12 }}>
            <SaveButton onPress={saveEntry} disabled={!name || saving}>
              <Ionicons name="checkmark" size={22} color="#fff" />
              <SaveButtonText>
                {saving ? "Saving…" : "Save Medication"}
              </SaveButtonText>
            </SaveButton>
          </View>

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
