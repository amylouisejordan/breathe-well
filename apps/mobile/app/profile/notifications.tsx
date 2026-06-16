import { Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
        <Title>Notifications</Title>
        <Subtext>
          Choose the reminders that feel helpful for your routine
        </Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel>Health reminders</SectionLabel>

          <ToggleRow>
            <RowText>Daily symptom reminder</RowText>
            <Switch
              value={symptomReminder}
              onValueChange={setSymptomReminder}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText>Medication reminders</RowText>
            <Switch
              value={medicationReminder}
              onValueChange={setMedicationReminder}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText>AI companion check‑ins</RowText>
            <Switch
              value={aiCheckins}
              onValueChange={setAiCheckins}
              thumbColor="#4a90e2"
            />
          </ToggleRow>
        </Card>

        <Card>
          <SectionLabel>Community</SectionLabel>

          <ToggleRow>
            <RowText>Replies to your posts</RowText>
            <Switch
              value={communityReplies}
              onValueChange={setCommunityReplies}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          <ToggleRow>
            <RowText>New posts in followed topics</RowText>
            <Switch
              value={newPosts}
              onValueChange={setNewPosts}
              thumbColor="#4a90e2"
            />
          </ToggleRow>
        </Card>

        <Card>
          <SectionLabel>Quiet hours</SectionLabel>

          <ToggleRow>
            <RowText>Silence notifications at night</RowText>
            <Switch
              value={quietHours}
              onValueChange={setQuietHours}
              thumbColor="#4a90e2"
            />
          </ToggleRow>

          {quietHours && (
            <CardSub>Notifications will be paused between 10pm and 8am</CardSub>
          )}
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Save notification settings"
      >
        <Ionicons name="checkmark" size={22} color="#fff" />
        <ButtonText>Save Settings</ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default NotificationsScreen;
