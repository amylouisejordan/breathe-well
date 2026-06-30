import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  ScrollArea,
  Title,
  Subtitle,
  Divider,
  OptionCard,
  IconWrap,
  TextWrap,
  OptionTitle,
  OptionText,
  FooterNote,
  CancelButton,
  CancelText,
  AnimatedCardWrapper,
} from "../styled";
import { View } from "react-native";

const AddEntry = () => {
  return (
    <Container>
      <ScrollArea showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ title: "Add Entry" }} />
        <Title accessibilityRole="header">Add Entry</Title>
        <Subtitle>Take a moment to record how you’re doing today</Subtitle>

        <Divider style={{ marginTop: 0 }} />

        <AnimatedCardWrapper delay={200}>
          <OptionCard
            onPress={() => router.push("/(modals)/add-symptom-form")}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Symptom entry. Track breathlessness, mood, or changes in how you feel."
            accessibilityHint="Navigates to the symptom log form screen."
          >
            <IconWrap
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              <Ionicons name="pulse" size={28} color="#4a90e2" />
            </IconWrap>

            <TextWrap>
              <OptionTitle>Symptom</OptionTitle>
              <OptionText>
                Track breathlessness, mood, or changes in how you feel
              </OptionText>
            </TextWrap>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#ccc"
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            />
          </OptionCard>
        </AnimatedCardWrapper>

        <AnimatedCardWrapper delay={280}>
          <OptionCard
            onPress={() => router.push("/(modals)/add-medication-form")}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Medication entry. Record medication taken, dosage, or timing."
            accessibilityHint="Navigates to the medication entry log form screen."
          >
            <IconWrap
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              <Ionicons name="medkit" size={28} color="#4a90e2" />
            </IconWrap>

            <TextWrap>
              <OptionTitle>Medication</OptionTitle>
              <OptionText>
                Record medication taken, dosage, or timing
              </OptionText>
            </TextWrap>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#ccc"
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            />
          </OptionCard>
        </AnimatedCardWrapper>

        <AnimatedCardWrapper delay={360}>
          <OptionCard
            onPress={() => router.push("/(modals)/add-wellbeing-form")}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Wellbeing check in entry. Reflect on mood, connection, and how supported you feel today."
            accessibilityHint="Navigates to the wellbeing assessment entry form screen."
          >
            <IconWrap
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              <Ionicons name="happy" size={28} color="#4a90e2" />
            </IconWrap>

            <TextWrap>
              <OptionTitle>Wellbeing Check‑in</OptionTitle>
              <OptionText>
                Reflect on mood, connection, and how supported you feel today
              </OptionText>
            </TextWrap>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#ccc"
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            />
          </OptionCard>
        </AnimatedCardWrapper>

        <FooterNote>
          Logging regularly helps you notice patterns over time
        </FooterNote>
      </ScrollArea>

      <View>
        <CancelButton
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Cancel adding entry"
          accessibilityHint="Returns back to the previous screen tracking logs panel without saving."
        >
          <CancelText>Cancel</CancelText>
        </CancelButton>
      </View>
    </Container>
  );
};

export default AddEntry;
