import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Bullet,
  BulletText,
  BulletWrap,
  ButtonText,
  Card,
  Container,
  FloatingButton,
  Paragraph,
  Row,
  RowText,
  SectionLabel,
  Subtext,
  Title,
} from "./styled";

const PrivacyScreen = () => {
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title>Privacy & Data</Title>
        <Subtext>
          Your information is yours. We keep it safe and transparent.
        </Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel>What BreatheWell stores</SectionLabel>

          <Paragraph>
            BreatheWell only stores the information you choose to add:
          </Paragraph>

          <BulletWrap>
            <Bullet>•</Bullet>
            <BulletText>Symptoms you log</BulletText>
          </BulletWrap>

          <BulletWrap>
            <Bullet>•</Bullet>
            <BulletText>Medication entries</BulletText>
          </BulletWrap>

          <BulletWrap>
            <Bullet>•</Bullet>
            <BulletText>Forum posts and replies</BulletText>
          </BulletWrap>

          <BulletWrap>
            <Bullet>•</Bullet>
            <BulletText>Your breathing preferences</BulletText>
          </BulletWrap>

          <BulletWrap>
            <Bullet>•</Bullet>
            <BulletText>Basic account details</BulletText>
          </BulletWrap>
        </Card>

        <Card>
          <SectionLabel>How your data is used</SectionLabel>

          <Paragraph>
            Your data is used to personalise your experience and help you track
            your wellbeing over time. It is never sold or shared with third
            parties for advertising.
          </Paragraph>

          <Paragraph>
            You stay in control of what you add, edit, or delete.
          </Paragraph>
        </Card>

        <Card>
          <SectionLabel>Your data tools</SectionLabel>

          <Row>
            <RowText>Download my data</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>

          <Row>
            <RowText style={{ color: "#d9534f", fontWeight: 600 }}>
              Delete my data
            </RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>
        </Card>

        <Card>
          <SectionLabel>Privacy policy</SectionLabel>

          <Row>
            <RowText>View full privacy policy</RowText>
            <Ionicons name="open-outline" size={20} color="#6c63ff" />
          </Row>
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <ButtonText>Back</ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default PrivacyScreen;
