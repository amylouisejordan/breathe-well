import React from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Row, RowText, SectionLabel, Subtext } from "./styled";
import { Container, Card, Paragraph, Title } from "../styled";

const HelpScreen = () => {
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title accessibilityRole="header">Help & Support</Title>
        <Subtext>You’re not alone. Here are some ways we can help.</Subtext>

        <Card
          style={{ marginTop: 0 }}
          accessibilityRole="list"
          accessibilityLabel="Quick help guide articles"
        >
          <SectionLabel accessibilityRole="header">Quick help</SectionLabel>

          <Row
            onPress={() => router.push("/help/how-to-log-symptoms")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="How to log symptoms"
            accessibilityHint="Opens help article on tracking symptoms"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              How to log symptoms
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
            onPress={() => router.push("/help/how-to-log-medication")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="How to log medication"
            accessibilityHint="Opens help article on tracking medications"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              How to log medication
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
            onPress={() => router.push("/help/using-ai")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="Using the AI companion"
            accessibilityHint="Opens help article on working with your AI guide"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Using the AI companion
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
            onPress={() => router.push("/help/community-safety")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="Staying safe in the community"
            accessibilityHint="Opens help article regarding community standards and safety protocols"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Staying safe in the community
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

        <Card
          accessibilityRole="list"
          accessibilityLabel="Frequently asked questions list"
        >
          <SectionLabel accessibilityRole="header">
            Frequently asked questions
          </SectionLabel>

          <Row
            onPress={() => router.push("/help/data-privacy")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="Is my data private?"
            accessibilityHint="Opens help article about your profile data encryption and records privacy"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Is my data private?
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
            onPress={() => router.push("/help/editing-entries")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="Can I edit or delete entries?"
            accessibilityHint="Opens help article about modifying your history timeline logs"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              Can I edit or delete entries?
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
            onPress={() => router.push("/help/changing-preferences")}
            accessible={true}
            accessibilityRole="link"
            accessibilityLabel="How do I change my preferences?"
            accessibilityHint="Opens help article explaining application styling and calculation configurations"
          >
            <RowText
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              How do I change my preferences?
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
          <SectionLabel accessibilityRole="header">
            Contact support
          </SectionLabel>

          <Paragraph>
            If something isn’t working or you need help, you can reach us at:
          </Paragraph>

          <Row
            onPress={() => router.push("/help/contact-support")}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Contact support by email at support@breathewell.app"
            accessibilityHint="Opens your default mail platform to draft a message to our support staff"
          >
            <RowText
              style={{ color: "#4a90e2", fontWeight: "600" }}
              importantForAccessibility="no"
              accessibilityElementsHidden={true}
            >
              support@breathewell.app
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

        <Card
          accessible={true}
          accessibilityLabel="Important safety disclaimer note"
        >
          <SectionLabel accessibilityRole="header" style={{ color: "#d9534f" }}>
            If you need urgent help
          </SectionLabel>

          <Paragraph>
            BreatheWell cannot provide medical or emergency support. If you’re
            feeling very unwell, distressed, or unsafe, please reach out to a
            trusted person or local services who can help you right away.
          </Paragraph>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default HelpScreen;
