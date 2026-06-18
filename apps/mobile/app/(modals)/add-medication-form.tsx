import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
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
  };

  const saveEntry = async () => {
    if (!name.trim() || !slot) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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

          <AnimatedCardWrapper delay={300}>
            <Card>
              <Label>Time of day</Label>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 8,
                }}
              >
                {(Object.keys(SLOT_LABELS) as Slot[]).map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setSlot(s)}
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
              <Ionicons name="refresh" size={18} color="#4a90e2" />
              <ResetText>Reset</ResetText>
            </ResetButton>
          </View>

          <View style={{ marginTop: 12 }}>
            <SaveButton
              disabled={!name.trim() || !slot || saving}
              onPress={saveEntry}
            >
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
