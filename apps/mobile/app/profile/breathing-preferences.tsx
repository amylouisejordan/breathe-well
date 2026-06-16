import { Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
        <Title>Breathing Preferences</Title>
        <Subtext>
          These settings help BreatheWell support you in a way that feels right
          for you
        </Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel>Breathing exercise style</SectionLabel>

          {BREATHING_STYLES.map((option) => (
            <Row key={option} onPress={() => setStyle(option)}>
              <RowText>{option}</RowText>
              {style === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>Breathing pace</SectionLabel>

          {BREATHING_PACE.map((option) => (
            <Row key={option} onPress={() => setPace(option)}>
              <RowText>{option}</RowText>
              {pace === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>Exercise duration</SectionLabel>

          {EXERCISE_DURATION.map((option) => (
            <Row key={option} onPress={() => setDuration(option)}>
              <RowText>{option}</RowText>
              {duration === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>AI check‑in frequency</SectionLabel>

          {CHECKIN_OPTIONS.map((option) => (
            <Row key={option} onPress={() => setCheckins(option)}>
              <RowText>{option}</RowText>
              {checkins === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>Encouragement style</SectionLabel>

          {ENCOURAGEMENT_STYLE.map((option) => (
            <Row key={option} onPress={() => setEncouragement(option)}>
              <RowText>{option}</RowText>
              {encouragement === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>Calming features</SectionLabel>

          <ToggleRow>
            <RowText>Show calming animations</RowText>
            <Switch
              value={calmingAnimations}
              onValueChange={setCalmingAnimations}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText>Reduce motion</RowText>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              thumbColor="#4a90e2"
            />
          </ToggleRow>
        </Card>
      </ScrollView>

      <FloatingButton onPress={() => router.back()}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <ButtonText>Save Preferences</ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default BreathingPreferences;
