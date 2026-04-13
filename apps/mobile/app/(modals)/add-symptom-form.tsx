import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router, Stack } from "expo-router";

import { load, save } from "../../utils/storage";

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

const TAGS = ["Breathless", "Wheezy", "Tight chest", "Cough", "Fatigue"];

const AddSymptomForm = () => {
  const [severity, setSeverity] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetForm = () => {
    setSeverity(5);
    setTags([]);
    setNotes("");
  };

  const saveEntry = async () => {
    const existing = (await load("symptoms")) || [];

    const newEntry = {
      severity,
      tags,
      notes,
      date: new Date().toISOString(),
    };

    await save("symptoms", [...existing, newEntry]);
    router.back();
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
          <Title>Log Symptom</Title>
          <Subtitle>Take a moment to record how you’re feeling</Subtitle>

          <Divider />

          <AnimatedCardWrapper delay={150}>
            <Card>
              <Label>
                Severity: <Severity>{severityLabel}</Severity>
              </Label>

              <SliderRow>
                <Slider
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={severity}
                  onValueChange={setSeverity}
                  minimumTrackTintColor="#6c63ff"
                  maximumTrackTintColor="#ddd"
                  thumbTintColor="#6c63ff"
                  style={{ flex: 1 }}
                />
                <SeverityNumber>{severity}</SeverityNumber>
              </SliderRow>

              <ScaleHint>1 = very mild, 10 = very severe</ScaleHint>
            </Card>
          </AnimatedCardWrapper>

          <AnimatedCardWrapper delay={250}>
            <Card>
              <Label>
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
              />
            </Card>
          </AnimatedCardWrapper>

          <View>
            <ResetButton onPress={resetForm}>
              <Ionicons name="refresh" size={18} color="#6c63ff" />
              <ResetText>Reset</ResetText>
            </ResetButton>
          </View>

          <View>
            <SaveButton onPress={saveEntry}>
              <Ionicons name="checkmark" size={22} color="#fff" />
              <SaveButtonText>Save Symptom</SaveButtonText>
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
