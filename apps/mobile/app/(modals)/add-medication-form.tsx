import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import * as Haptics from "expo-haptics";

import { saveMedicationEntry } from "@/utils/loggingFirestore";
import { Label } from "@react-navigation/elements";
import {
  AnimatedCardWrapper,
  ResetButton,
  ResetText,
  SaveButton,
  FooterNote,
  ScrollArea,
  Input,
  TextArea,
} from "./styled";
import {
  Card,
  Container,
  Divider,
  Title,
  Subtitle,
  ButtonText,
} from "../styled";

type Slot = "morning" | "afternoon" | "evening";

const SLOT_LABELS: Record<Slot, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

const AddMedicationForm = () => {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [slot, setSlot] = useState<Slot | null>(null);

  const resetForm = () => {
    setName("");
    setDose("");
    setNotes("");
    setSlot(null);
    AccessibilityInfo.announceForAccessibility("Medication form cleared.");
  };

  const saveEntry = async () => {
    if (!name.trim() || !slot) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      AccessibilityInfo.announceForAccessibility(
        "Validation error. Missing name or time slot."
      );
      Alert.alert("Missing info", "Please select a time slot.");
      return;
    }
    setSaving(true);
    try {
      await saveMedicationEntry({
        name: name.trim(),
        dose: dose.trim(),
        notes: notes.trim(),
        date: new Date().toISOString(),
        slot,
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      AccessibilityInfo.announceForAccessibility(
        "Medication entry successfully saved."
      );
      router.back();
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      AccessibilityInfo.announceForAccessibility(
        "Network error. Failed to save medication entry."
      );
      Alert.alert("Oops", "Couldn't save – try again?");
    } finally {
      setSaving(false);
    }
  };

  const isSaveDisabled = !name.trim() || !slot || saving;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Add Medication" }} />
      <Container>
        <ScrollArea showsVerticalScrollIndicator={false}>
          <Title accessibilityRole="header">Log Medication</Title>
          <Subtitle>What medication did you take today?</Subtitle>

          <Divider style={{ marginTop: 0 }} />

          <AnimatedCardWrapper delay={150}>
            <Card>
              <Label nativeID="medicationNameLabel">Medication name</Label>
              <Input
                style={{ marginTop: 10 }}
                placeholder="e.g. Salbutamol inhaler"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                accessibilityLabel="Medication name input field"
                accessibilityHint="Enter the name of your medication"
              />
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={250}>
            <Card>
              <Label nativeID="dosageLabel">Dosage</Label>
              <Input
                style={{ marginTop: 10 }}
                placeholder="e.g. 2 puffs"
                placeholderTextColor="#999"
                value={dose}
                onChangeText={setDose}
                accessibilityLabel="Dosage input field"
                accessibilityHint="Enter the amounts or quantities taken"
              />
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={300}>
            <Card>
              <Label accessibilityRole="header">Time of day</Label>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
                accessibilityRole="radiogroup"
                accessibilityLabel="Time of day slots selection"
              >
                {(Object.keys(SLOT_LABELS) as Slot[]).map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setSlot(s)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: slot === s }}
                    accessibilityLabel={`${SLOT_LABELS[s]} time slot`}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      marginHorizontal: 4,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: slot === s ? "#4a90e2" : "#ddd",
                      backgroundColor: slot === s ? "#f3f0ff" : "#fff",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: slot === s ? "600" : "400",
                        color: slot === s ? "#4a90e2" : "#333",
                      }}
                    >
                      {SLOT_LABELS[s]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={400}>
            <Card>
              <Label nativeID="notesLabel">Notes</Label>
              <TextArea
                style={{ marginTop: 10 }}
                placeholder="Add anything you'd like to remember"
                placeholderTextColor="#999"
                value={notes}
                onChangeText={setNotes}
                multiline
                accessibilityLabel="Optional medication notes field"
                accessibilityHint="Enter any additional details or side effects observed"
              />
            </Card>
          </AnimatedCardWrapper>

          <View>
            <ResetButton
              onPress={resetForm}
              accessibilityRole="button"
              accessibilityLabel="Reset medication form input choices"
            >
              <Ionicons
                name="refresh"
                size={18}
                color="#4a90e2"
                importantForAccessibility="no"
              />
              <ResetText>Reset</ResetText>
            </ResetButton>
          </View>

          <View style={{ marginTop: 12 }}>
            <SaveButton
              disabled={isSaveDisabled}
              onPress={saveEntry}
              accessibilityRole="button"
              accessibilityState={{ disabled: isSaveDisabled, busy: saving }}
              accessibilityLabel={
                saving ? "Saving entry data" : "Save Medication Entry"
              }
            >
              <Ionicons
                name="checkmark"
                size={22}
                color="#fff"
                importantForAccessibility="no"
              />
              <ButtonText>{saving ? "Saving…" : "Save Medication"}</ButtonText>
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
