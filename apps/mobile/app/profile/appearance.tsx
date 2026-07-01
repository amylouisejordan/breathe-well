import React, { useState } from "react";
import { ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FloatingButton,
  Hint,
  Row,
  RowText,
  SectionLabel,
  Subtext,
  ToggleRow,
} from "./styled";
import { Container, Card, Title, ButtonText } from "../styled";

const THEMES = ["Light", "Dark", "High contrast"];
const TEXT_SIZES = ["Small", "Medium", "Large", "Extra large"];

const AppearanceScreen = () => {
  const [theme, setTheme] = useState("Light");
  const [textSize, setTextSize] = useState("Medium");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [calmingMode, setCalmingMode] = useState(true);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title accessibilityRole="header">Appearance</Title>
        <Subtext>
          Make BreatheWell feel comfortable for your eyes and energy levels
        </Subtext>

        <Card
          accessibilityRole="radiogroup"
          accessibilityLabel="Select application theme"
        >
          <SectionLabel accessibilityRole="header">Theme</SectionLabel>

          {THEMES.map((option) => (
            <Row
              key={option}
              onPress={() => setTheme(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: theme === option }}
              accessibilityLabel={`${option} theme`}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {theme === option && (
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
          accessibilityLabel="Select screen text scaling size"
        >
          <SectionLabel accessibilityRole="header">Text size</SectionLabel>

          {TEXT_SIZES.map((option) => (
            <Row
              key={option}
              onPress={() => setTextSize(option)}
              accessible={true}
              accessibilityRole="radio"
              accessibilityState={{ checked: textSize === option }}
              accessibilityLabel={`${option} text size`}
            >
              <RowText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                {option}
              </RowText>
              {textSize === option && (
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
            Comfort settings
          </SectionLabel>

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
              accessibilityHint="Disables structural interface animations and screen motion transitions"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Calming mode
            </RowText>
            <Switch
              value={calmingMode}
              onValueChange={setCalmingMode}
              thumbColor="#4a90e2"
              accessibilityLabel="Calming mode"
              accessibilityHint="Softens UI interface color combinations and reduces high-contrast visual noise"
            />
          </ToggleRow>

          {calmingMode && (
            <Hint accessible={true}>
              Calming mode softens colours and reduces visual noise
            </Hint>
          )}
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Save appearance adjustments"
        accessibilityHint="Saves modifications and navigates back to the parent dashboard"
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
          Save Settings
        </ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default AppearanceScreen;
