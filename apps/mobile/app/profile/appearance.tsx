import { ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import {
  ButtonText,
  Card,
  Container,
  FloatingButton,
  Hint,
  Row,
  RowText,
  SectionLabel,
  Subtext,
  Title,
  ToggleRow,
} from "./styled";

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
        <Title>Appearance</Title>
        <Subtext>
          Make BreatheWell feel comfortable for your eyes and energy levels
        </Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel>Theme</SectionLabel>

          {THEMES.map((option) => (
            <Row key={option} onPress={() => setTheme(option)}>
              <RowText>{option}</RowText>
              {theme === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>Text size</SectionLabel>

          {TEXT_SIZES.map((option) => (
            <Row key={option} onPress={() => setTextSize(option)}>
              <RowText>{option}</RowText>
              {textSize === option && (
                <Ionicons name="checkmark-circle" size={22} color="#4a90e2" />
              )}
            </Row>
          ))}
        </Card>

        <Card>
          <SectionLabel>Comfort settings</SectionLabel>

          <ToggleRow>
            <RowText>Reduce motion</RowText>
            <Switch
              value={reduceMotion}
              onValueChange={setReduceMotion}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText>Calming mode</RowText>
            <Switch
              value={calmingMode}
              onValueChange={setCalmingMode}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          {calmingMode && (
            <Hint>Calming mode softens colours and reduces visual noise</Hint>
          )}
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Save appearance settings"
      >
        <Ionicons name="checkmark" size={22} color="#fff" />
        <ButtonText>Save Settings</ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default AppearanceScreen;
