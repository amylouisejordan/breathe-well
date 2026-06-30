import React, { useState } from "react";
import { Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ButtonText,
  Card,
  Container,
  FloatingButton,
  Row,
  RowText,
  SectionLabel,
  Subtext,
  Title,
  ToggleRow,
} from "./styled";

const BREATHING_STYLES = [
  "Pursed‑lip breathing",
  "Diaphragmatic breathing",
  "Box breathing",
  "No exercises",
];

const CHECKIN_OPTIONS = ["Never", "Daily", "Twice daily", "With symptoms"];

const BREATHING_PACE = ["Slow", "Standard", "Slightly faster"];

const EXERCISE_DURATION = [
  "1 minute",
  "3 minutes",
  "5 minutes",
  "Choose each time",
];

const ENCOURAGEMENT_STYLE = [
  "Gentle and reassuring",
  "Practical and direct",
  "Motivational",
  "Quiet (minimal messages)",
];

const BreathingPreferences = () => {
  const [style, setStyle] = useState("Pursed‑lip breathing");
  const [checkins, setCheckins] = useState("Daily");
  const [pace, setPace] = useState("Slow");
  const [duration, setDuration] = useState("3 minutes");
  const [encouragement, setEncouragement] = useState("Gentle and reassuring");

  const [calmingAnimations, setCalmingAnimations] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title accessibilityRole="header">Breathing Preferences</Title>
        <Subtext>
          These settings help BreatheWell support you in a way that feels right
          for you
        </Subtext>

        <Card
          style={{ marginTop: 0 }}
          accessibilityRole="radiogroup"
          accessibilityLabel="Select breathing exercise style"
        >
          <SectionLabel accessibilityRole="header">
            Breathing exercise style
          </SectionLabel>

          {BREATHING_STYLES.map((option) => (
            <Row
              key={option}
              onPress={() => setStyle(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: style === option }}
              accessibilityLabel={option}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {style === option && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#4a90e2"
                  importantForAccessibility="no"
                  accessibilityElementsHidden={true}
                />
              )}
            </Row>
          ))}
        </Card>

        <Card
          accessibilityRole="radiogroup"
          accessibilityLabel="Select breathing pace speed"
        >
          <SectionLabel accessibilityRole="header">Breathing pace</SectionLabel>

          {BREATHING_PACE.map((option) => (
            <Row
              key={option}
              onPress={() => setPace(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: pace === option }}
              accessibilityLabel={`${option} pace`}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {pace === option && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#4a90e2"
                  importantForAccessibility="no"
                  accessibilityElementsHidden={true}
                />
              )}
            </Row>
          ))}
        </Card>

        <Card
          accessibilityRole="radiogroup"
          accessibilityLabel="Select breathing exercise duration length"
        >
          <SectionLabel accessibilityRole="header">
            Exercise duration
          </SectionLabel>

          {EXERCISE_DURATION.map((option) => (
            <Row
              key={option}
              onPress={() => setDuration(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: duration === option }}
              accessibilityLabel={option}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {duration === option && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#4a90e2"
                  importantForAccessibility="no"
                  accessibilityElementsHidden={true}
                />
              )}
            </Row>
          ))}
        </Card>

        <Card
          accessibilityRole="radiogroup"
          accessibilityLabel="Select AI check-in frequency intervals"
        >
          <SectionLabel accessibilityRole="header">
            AI check‑in frequency
          </SectionLabel>

          {CHECKIN_OPTIONS.map((option) => (
            <Row
              key={option}
              onPress={() => setCheckins(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: checkins === option }}
              accessibilityLabel={`Check in ${option}`}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {checkins === option && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#4a90e2"
                  importantForAccessibility="no"
                  accessibilityElementsHidden={true}
                />
              )}
            </Row>
          ))}
        </Card>

        <Card
          accessibilityRole="radiogroup"
          accessibilityLabel="Select messaging encouragement style"
        >
          <SectionLabel accessibilityRole="header">
            Encouragement style
          </SectionLabel>

          {ENCOURAGEMENT_STYLE.map((option) => (
            <Row
              key={option}
              onPress={() => setEncouragement(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: encouragement === option }}
              accessibilityLabel={`${option} encouragement`}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {encouragement === option && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color="#4a90e2"
                  importantForAccessibility="no"
                  accessibilityElementsHidden={true}
                />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel accessibilityRole="header">
            Calming features
          </SectionLabel>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Show calming animations
            </RowText>
            <Switch
              value={calmingAnimations}
              onValueChange={setCalmingAnimations}
              thumbColor="#4a90e2"
              accessibilityLabel="Show calming animations"
              accessibilityHint="Toggles background UI ambient breathing animations"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Reduce motion
            </RowText>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              thumbColor="#4a90e2"
              accessibilityLabel="Reduce motion"
              accessibilityHint="Disables structural UI movement and transition animations"
            />
          </ToggleRow>
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Save application preferences"
        accessibilityHint="Saves current configuration states and returns to the previous screen"
      >
        <Ionicons
          name="checkmark"
          size={22}
          color="#fff"
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        />
        <ButtonText
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Save Preferences
        </ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default BreathingPreferences;
