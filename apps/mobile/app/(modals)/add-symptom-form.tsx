import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  AccessibilityInfo,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
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
  Severity,
  SliderRow,
  SeverityNumber,
  ScaleHint,
  TagWrap,
  Tag,
  TagText,
  TagCount,
  TextArea,
  ResetButton,
  ResetText,
  SaveButton,
  SaveButtonText,
  FooterNote,
} from "../styled";
import { saveSymptomEntry } from "@/utils/loggingFirestore";

const TAGS = ["Breathless", "Wheezy", "Tight chest", "Cough", "Fatigue"];

const AddSymptomForm = () => {
  const [severity, setSeverity] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleTag = (tag: string) => {
    const isSelecting = !tags.includes(tag);
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    AccessibilityInfo.announceForAccessibility(
      `${tag} symptom ${isSelecting ? "selected" : "deselected"}.`
    );
  };

  const resetForm = () => {
    setSeverity(5);
    setTags([]);
    setNotes("");
    AccessibilityInfo.announceForAccessibility("Symptom form cleared.");
  };

  const saveEntry = async () => {
    setSaving(true);
    try {
      await saveSymptomEntry({
        severity,
        tags,
        notes: notes.trim(),
        date: new Date().toISOString(),
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      AccessibilityInfo.announceForAccessibility(
        "Symptom details successfully saved."
      );
      router.back();
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      AccessibilityInfo.announceForAccessibility(
        "Failed to save symptom details."
      );
      Alert.alert("Oops", "Couldn't save – try again?");
    } finally {
      setSaving(false);
    }
  };

  const severityLabel =
    severity <= 3 ? "Mild" : severity <= 6 ? "Moderate" : "Severe";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Add Symptom" }} />
      <Container>
        <ScrollArea showsVerticalScrollIndicator={false}>
          <Title accessibilityRole="header">Log Symptom</Title>
          <Subtitle>Take a moment to record how you’re feeling</Subtitle>

          <Divider style={{ marginTop: 0 }} />

          <AnimatedCardWrapper delay={150}>
            <Card>
              <Label>
                Severity: <Severity>{severityLabel}</Severity>
              </Label>

              <SliderRow>
                <Slider
                  testID="mock-slider"
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={severity}
                  onValueChange={setSeverity}
                  minimumTrackTintColor="#4a90e2"
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#4a90e2"
                  style={{ flex: 1 }}
                  accessibilityRole="adjustable"
                  accessibilityLabel="Symptom severity rating bar"
                  accessibilityHint="Slide left or right to change intensity level from 1 to 10"
                  accessibilityValue={{
                    min: 1,
                    max: 10,
                    now: severity,
                    text: `${severity} out of 10, ${severityLabel}`,
                  }}
                  onAccessibilityAction={(event) => {
                    if (
                      event.nativeEvent.actionName === "increment" &&
                      severity < 10
                    ) {
                      setSeverity((prev) => prev + 1);
                    } else if (
                      event.nativeEvent.actionName === "decrement" &&
                      severity > 1
                    ) {
                      setSeverity((prev) => prev - 1);
                    }
                  }}
                />
                <SeverityNumber
                  importantForAccessibility="no"
                  accessibilityElementsHidden={true}
                >
                  {severity}
                </SeverityNumber>
              </SliderRow>

              <ScaleHint>1 = very mild, 10 = very severe</ScaleHint>
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={250}>
            <Card>
              <Label accessibilityRole="header">
                Symptoms
                {tags.length > 0 && (
                  <TagCount>({tags.length} selected)</TagCount>
                )}
              </Label>

              <TagWrap>
                {TAGS.map((tag) => (
                  <View key={tag}>
                    <Tag
                      active={tags.includes(tag)}
                      onPress={() => toggleTag(tag)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: tags.includes(tag) }}
                      accessibilityLabel={`${tag} symptom`}
                    >
                      <TagText active={tags.includes(tag)}>{tag}</TagText>
                    </Tag>
                  </View>
                ))}
              </TagWrap>
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={350}>
            <Card>
              <Label>Notes</Label>
              <TextArea
                placeholder="Add anything you’d like to remember"
                placeholderTextColor="#aaa"
                value={notes}
                onChangeText={setNotes}
                multiline
                accessibilityLabel="Optional descriptive notes field"
                accessibilityHint="Enter extra contextual observations regarding your symptom triggers here"
              />
            </Card>
          </AnimatedCardWrapper>

          <View>
            <ResetButton
              onPress={resetForm}
              accessibilityRole="button"
              accessibilityLabel="Reset symptom input form values"
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
              onPress={saveEntry}
              disabled={!severity || saving}
              accessibilityRole="button"
              accessibilityState={{
                disabled: !severity || saving,
                busy: saving,
              }}
              accessibilityLabel={
                saving ? "Saving symptom entry" : "Save Symptom Details"
              }
            >
              <Ionicons
                name="checkmark"
                size={22}
                color="#fff"
                importantForAccessibility="no"
              />
              <SaveButtonText>
                {saving ? "Saving…" : "Save Symptom"}
              </SaveButtonText>
            </SaveButton>
          </View>

          <FooterNote>
            Logging regularly helps you notice patterns over time
          </FooterNote>
        </ScrollArea>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AddSymptomForm;
