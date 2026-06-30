import React, { useState } from "react";
import { Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ButtonText,
  Card,
  CardSub,
  Container,
  FloatingButton,
  RowText,
  SectionLabel,
  Subtext,
  Title,
  ToggleRow,
} from "./styled";

const NotificationsScreen = () => {
  const [symptomReminder, setSymptomReminder] = useState(true);
  const [medicationReminder, setMedicationReminder] = useState(false);
  const [aiCheckins, setAiCheckins] = useState(true);
  const [communityReplies, setCommunityReplies] = useState(true);
  const [newPosts, setNewPosts] = useState(false);
  const [quietHours, setQuietHours] = useState(false);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title accessibilityRole="header">Notifications</Title>
        <Subtext>
          Choose the reminders that feel helpful for your routine
        </Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel accessibilityRole="header">
            Health reminders
          </SectionLabel>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Daily symptom reminder
            </RowText>
            <Switch
              value={symptomReminder}
              onValueChange={setSymptomReminder}
              thumbColor="#4a90e2"
              accessibilityLabel="Daily symptom reminder"
              accessibilityHint="Toggles daily logs reminder push notifications"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Medication reminders
            </RowText>
            <Switch
              value={medicationReminder}
              onValueChange={setMedicationReminder}
              thumbColor="#4a90e2"
              accessibilityLabel="Medication reminders"
              accessibilityHint="Toggles notifications for your registered medicine schedules"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              AI companion check‑ins
            </RowText>
            <Switch
              value={aiCheckins}
              onValueChange={setAiCheckins}
              thumbColor="#4a90e2"
              accessibilityLabel="AI companion check‑ins"
              accessibilityHint="Toggles proactive check-in alert updates from your companion"
            />
          </ToggleRow>
        </Card>

        <Card>
          <SectionLabel accessibilityRole="header">Community</SectionLabel>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Replies to your posts
            </RowText>
            <Switch
              value={communityReplies}
              onValueChange={setCommunityReplies}
              thumbColor="#4a90e2"
              accessibilityLabel="Replies to your posts"
              accessibilityHint="Toggles push notifications when users interact with your feed discussions"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              New posts in followed topics
            </RowText>
            <Switch
              value={newPosts}
              onValueChange={setNewPosts}
              thumbColor="#4a90e2"
              accessibilityLabel="New posts in followed topics"
              accessibilityHint="Toggles notifications when new activity occurs in monitored conversation rooms"
            />
          </ToggleRow>
        </Card>

        <Card>
          <SectionLabel accessibilityRole="header">Quiet hours</SectionLabel>

          <ToggleRow>
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Silence notifications at night
            </RowText>
            <Switch
              value={quietHours}
              onValueChange={setQuietHours}
              thumbColor="#4a90e2"
              accessibilityLabel="Silence notifications at night"
              accessibilityHint="Enables scheduled mute rules for night hours"
            />
          </ToggleRow>

          {quietHours && (
            <CardSub accessible={true} accessibilityLiveRegion="polite">
              Notifications will be paused between 10pm and 8am
            </CardSub>
          )}
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Save notification settings"
        accessibilityHint="Saves notification routing preferences and navigates back to previous screen"
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

export default NotificationsScreen;
