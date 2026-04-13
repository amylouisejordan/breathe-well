import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

import {
  Container,
  ScrollArea,
  Title,
  Subtitle,
  Divider,
  AnimatedCardWrapper,
  Card,
  Label,
  TagWrap,
  Tag,
  EmotionLabel,
  TagCount,
  TextArea,
  ResetButton,
  ResetText,
  SaveButton,
  SaveButtonText,
  FooterNote,
} from "../styled";

import { saveWellbeingEntry } from "@/utils/loggingFirestore";

interface ReflectEmotion {
  key: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  score: number;
  tags: string[];
}

interface WellbeingEntry {
  emotion: string;
  tags: string[];
  notes: string;
  date: string;
}

export const REFLECT_EMOTIONS: ReflectEmotion[] = [
  {
    key: "great",
    label: "Great",
    icon: "sentiment-very-satisfied",
    color: "#4CAF50",
    score: 1,
    tags: [
      "Ambitious",
      "Awed",
      "Confident",
      "Creative",
      "Curious",
      "Determined",
      "Energised",
      "Excited",
      "Focused",
      "Fulfilled",
      "Grateful",
      "Happy",
      "Included",
      "Inspired",
      "Motivated",
      "Optimistic",
      "Peaceful",
      "Proud",
      "Successful",
      "Valued",
    ],
  },
  {
    key: "good",
    label: "Good",
    icon: "sentiment-satisfied",
    color: "#8BC34A",
    score: 2,
    tags: [
      "Awed",
      "Calm",
      "Cheerful",
      "Comfortable",
      "Confident",
      "Content",
      "Creative",
      "Curious",
      "Energised",
      "Focused",
      "Glad",
      "Grateful",
      "Happy",
      "Included",
      "Inspired",
      "Motivated",
      "Optimistic",
      "Peaceful",
      "Pensive",
      "Proud",
      "Successful",
      "Valued",
    ],
  },
  {
    key: "okay",
    label: "Okay",
    icon: "sentiment-neutral",
    color: "#FFEB3B",
    score: 3,
    tags: [
      "Annoyed",
      "Bored",
      "Comfortable",
      "Confused",
      "Content",
      "Curious",
      "Focused",
      "Glad",
      "Positive",
      "Reserved",
      "Restless",
      "Sensitive",
      "Shocked",
      "Skeptical",
      "Tired",
    ],
  },
  {
    key: "sad",
    label: "Sad",
    icon: "sentiment-dissatisfied",
    color: "#FF9800",
    score: 4,
    tags: [
      "Anxious",
      "Apathetic",
      "Bored",
      "Concerned",
      "Confused",
      "Disappointed",
      "Hurt",
      "Jealous",
      "Lonely",
      "Nervous",
      "Overwhelmed",
      "Sensitive",
      "Skeptical",
      "Stressed",
      "Stuck",
      "Tired",
    ],
  },
  {
    key: "upset",
    label: "Upset",
    icon: "sentiment-very-dissatisfied",
    color: "#F44336",
    score: 5,
    tags: [
      "Angry",
      "Anxious",
      "Depressed",
      "Exhausted",
      "Frightened",
      "Frustrated",
      "Hopeless",
      "Hurt",
      "Lonely",
      "Miserable",
      "Nervous",
      "Overwhelmed",
      "Stressed",
      "Stuck",
    ],
  },
];

const AddWellbeingCheckin = () => {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetForm = () => {
    setEmotion(null);
    setTags([]);
    setNotes("");
  };

  const saveEntry = async () => {
    const newEntry: WellbeingEntry = {
      emotion: emotion!,
      tags,
      notes,
      date: new Date().toISOString(),
    };

    await saveWellbeingEntry(newEntry);
    router.back();
  };

  const selectedEmotion = REFLECT_EMOTIONS.find((e) => e.key === emotion);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Wellbeing Check‑in" }} />
      <Container>
        <ScrollArea showsVerticalScrollIndicator={false}>
          <Title>Wellbeing Check‑in</Title>
          <Subtitle>Choose the face that best matches how you feel</Subtitle>

          <Divider style={{ marginTop: 0 }} />

          <AnimatedCardWrapper style={{ marginTop: 12 }} delay={150}>
            <Card>
              <Label>How are you feeling?</Label>

              <TagWrap
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 24,
                  rowGap: 28,
                  marginTop: 16,
                }}
              >
                {REFLECT_EMOTIONS.map((e) => (
                  <View key={e.key} style={{ alignItems: "center" }}>
                    <Pressable
                      onPress={() => {
                        setEmotion(e.key);
                        setTags([]);
                      }}
                      style={({ pressed }) => ({
                        backgroundColor:
                          emotion === e.key ? e.color + "55" : e.color + "22",
                        borderRadius: 999,
                        width: 90,
                        height: 90,
                        justifyContent: "center",
                        alignItems: "center",
                        transform: [{ scale: pressed ? 0.92 : 1 }],
                        borderWidth: emotion === e.key ? 2 : 0,
                        borderColor: e.color,
                        shadowColor: e.color,
                        shadowOpacity: emotion === e.key ? 0.3 : 0,
                        shadowRadius: 12,
                        shadowOffset: { width: 0, height: 2 },
                        marginBottom: 8,
                      })}
                    >
                      <MaterialIcons
                        name={e.icon}
                        size={34}
                        color={emotion === e.key ? e.color : "#555"}
                      />
                    </Pressable>

                    <EmotionLabel active={emotion === e.key}>
                      {e.label}
                    </EmotionLabel>
                  </View>
                ))}
              </TagWrap>
            </Card>
          </AnimatedCardWrapper>

          {selectedEmotion && (
            <AnimatedCardWrapper style={{ marginTop: 12 }} delay={200}>
              <Card
                style={{
                  backgroundColor: selectedEmotion.color + "10",
                  alignItems: "center",
                  paddingVertical: 24,
                  borderWidth: 1,
                  borderColor: "#eee",
                }}
              >
                <MaterialIcons
                  name={selectedEmotion.icon}
                  size={40}
                  color={selectedEmotion.color}
                />

                <EmotionLabel active style={{ marginTop: 10, fontSize: 18 }}>
                  You’re feeling {selectedEmotion.label}
                </EmotionLabel>
              </Card>
            </AnimatedCardWrapper>
          )}

          {selectedEmotion && (
            <AnimatedCardWrapper style={{ marginTop: 12 }} delay={250}>
              <Card>
                <Label>
                  What best describes your feelings?
                  {tags.length > 0 && (
                    <TagCount>({tags.length} selected)</TagCount>
                  )}
                </Label>

                <TagWrap
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    rowGap: 12,
                    marginTop: 12,
                  }}
                >
                  {selectedEmotion.tags.map((tag) => (
                    <View key={tag}>
                      <Tag
                        active={tags.includes(tag)}
                        onPress={() => toggleTag(tag)}
                      >
                        <EmotionLabel active={tags.includes(tag)}>
                          {tag}
                        </EmotionLabel>
                      </Tag>
                    </View>
                  ))}
                </TagWrap>
              </Card>
            </AnimatedCardWrapper>
          )}

          {emotion && (
            <AnimatedCardWrapper style={{ marginTop: 12 }} delay={300}>
              <Card>
                <Label>Why do you feel this way today?</Label>
                <TextArea
                  placeholder="You can share as much or as little as you like"
                  placeholderTextColor="#aaa"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                />
              </Card>
            </AnimatedCardWrapper>
          )}

          <View>
            <ResetButton onPress={resetForm}>
              <Ionicons name="refresh" size={18} color="#6c63ff" />
              <ResetText>Reset</ResetText>
            </ResetButton>
          </View>

          <View>
            <SaveButton onPress={saveEntry} disabled={!emotion}>
              <Ionicons name="checkmark" size={22} color="#fff" />
              <SaveButtonText>Save Check‑in</SaveButtonText>
            </SaveButton>
          </View>

          <FooterNote>
            Checking in regularly helps you understand your emotional wellbeing
          </FooterNote>
        </ScrollArea>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AddWellbeingCheckin;
