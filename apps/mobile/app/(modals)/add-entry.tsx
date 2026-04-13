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
        <Title>Add Entry</Title>
        <Subtitle>Take a moment to record how you’re doing today</Subtitle>

        <Divider style={{ marginTop: 0 }} />

        <AnimatedCardWrapper delay={200}>
          <OptionCard onPress={() => router.push("/(modals)/add-symptom-form")}>
            <IconWrap>
              <Ionicons name="pulse" size={28} color="#6c63ff" />
            </IconWrap>

            <TextWrap>
              <OptionTitle>Symptom</OptionTitle>
              <OptionText>
                Track breathlessness, mood, or changes in how you feel
              </OptionText>
            </TextWrap>

            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </OptionCard>
        </AnimatedCardWrapper>

        <AnimatedCardWrapper delay={280}>
          <OptionCard
            onPress={() => router.push("/(modals)/add-medication-form")}
          >
            <IconWrap>
              <Ionicons name="medkit" size={28} color="#6c63ff" />
            </IconWrap>

            <TextWrap>
              <OptionTitle>Medication</OptionTitle>
              <OptionText>
                Record medication taken, dosage, or timing
              </OptionText>
            </TextWrap>

            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </OptionCard>
        </AnimatedCardWrapper>

        <AnimatedCardWrapper delay={360}>
          <OptionCard
            onPress={() => router.push("/(modals)/add-wellbeing-form")}
          >
            <IconWrap>
              <Ionicons name="happy" size={28} color="#6c63ff" />
            </IconWrap>

            <TextWrap>
              <OptionTitle>Wellbeing Check‑in</OptionTitle>
              <OptionText>
                Reflect on mood, connection, and how supported you feel today
              </OptionText>
            </TextWrap>

            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </OptionCard>
        </AnimatedCardWrapper>

        <FooterNote>
          Logging regularly helps you notice patterns over time
        </FooterNote>
      </ScrollArea>

      <View>
        <CancelButton onPress={() => router.back()}>
          <CancelText>Cancel</CancelText>
        </CancelButton>
      </View>
    </Container>
  );
};

export default AddEntry;
