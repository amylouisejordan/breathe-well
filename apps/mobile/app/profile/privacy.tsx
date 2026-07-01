import React from "react";
import { ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Bullet,
  BulletText,
  BulletWrap,
  FloatingButton,
  Row,
  RowText,
  SectionLabel,
  Subtext,
} from "./styled";
import { Container, ButtonText, Card, Paragraph, Title } from "../styled";

const PrivacyScreen = () => {
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title accessibilityRole="header">Privacy & Data</Title>
        <Subtext>
          Your information is yours. We keep it safe and transparent.
        </Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel accessibilityRole="header">
            What BreatheWell stores
          </SectionLabel>

          <Paragraph>
            BreatheWell only stores the information you choose to add:
          </Paragraph>

          <View
            accessibilityRole="list"
            accessibilityLabel="Stored items details list"
          >
            <BulletWrap accessible={true} accessibilityLabel="Symptoms you log">
              <Bullet
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                •
              </Bullet>
              <BulletText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                Symptoms you log
              </BulletText>
            </BulletWrap>

            <BulletWrap
              accessible={true}
              accessibilityLabel="Medication entries"
            >
              <Bullet
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                •
              </Bullet>
              <BulletText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                Medication entries
              </BulletText>
            </BulletWrap>

            <BulletWrap
              accessible={true}
              accessibilityLabel="Forum posts and replies"
            >
              <Bullet
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                •
              </Bullet>
              <BulletText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                Forum posts and replies
              </BulletText>
            </BulletWrap>

            <BulletWrap
              accessible={true}
              accessibilityLabel="Your breathing preferences"
            >
              <Bullet
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                •
              </Bullet>
              <BulletText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                Your breathing preferences
              </BulletText>
            </BulletWrap>

            <BulletWrap
              accessible={true}
              accessibilityLabel="Basic account details"
            >
              <Bullet
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                •
              </Bullet>
              <BulletText
                importantForAccessibility="no"
                accessibilityElementsHidden={true}
              >
                Basic account details
              </BulletText>
            </BulletWrap>
          </View>
        </Card>

        <Card>
          <SectionLabel accessibilityRole="header">
            How your data is used
          </SectionLabel>

          <Paragraph>
            Your data is used to personalise your experience and help you track
            your wellbeing over time. It is never sold or shared with third
            parties for advertising.
          </Paragraph>

          <Paragraph>
            You stay in control of what you add, edit, or delete.
          </Paragraph>
        </Card>

        <Card
          accessibilityRole="list"
          accessibilityLabel="Your data utility operations"
        >
          <SectionLabel accessibilityRole="header">
            Your data tools
          </SectionLabel>

          <Row
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Download my data"
            accessibilityHint="Triggers an operation to generate and compile a complete archive package download"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Download my data
            </RowText>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#bbb"
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            />
          </Row>

          <Row
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Delete my data"
            accessibilityHint="Permanently wipes out all profile logs and historical tracking data from local and database storage"
            accessibilityState={{ destructive: true }}
          >
            <RowText
              style={{ color: "#d9534f", fontWeight: "600" }}
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Delete my data
            </RowText>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#bbb"
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            />
          </Row>
        </Card>

        <Card>
          <SectionLabel accessibilityRole="header">Privacy policy</SectionLabel>

          <Row
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="View full privacy policy"
            accessibilityHint="Opens the full legalese documentation statement in your system browser"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              View full privacy policy
            </RowText>
            <Ionicons
              name="open-outline"
              size={20}
              color="#4a90e2"
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            />
          </Row>
        </Card>
      </ScrollView>

      <FloatingButton
        onPress={() => router.back()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Navigate back"
        accessibilityHint="Returns to the previous setup panel screen"
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color="#fff"
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        />
        <ButtonText
          importantForAccessibility="no"
          accessibilityElementsHidden={true}
        >
          Back
        </ButtonText>
      </FloatingButton>
    </Container>
  );
};

export default PrivacyScreen;
