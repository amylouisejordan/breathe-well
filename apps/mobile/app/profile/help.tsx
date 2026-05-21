import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Card,
  Container,
  Paragraph,
  Row,
  RowText,
  SectionLabel,
  Subtext,
  Title,
} from "./styled";

const HelpScreen = () => {
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <Title>Help & Support</Title>
        <Subtext>You’re not alone. Here are some ways we can help.</Subtext>

        <Card style={{ marginTop: 0 }}>
          <SectionLabel>Quick help</SectionLabel>

          <Row onPress={() => router.push("/help/how-to-log-symptoms")}>
            <RowText>How to log symptoms</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>

          <Row onPress={() => router.push("/help/how-to-log-medication")}>
            <RowText>How to log medication</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>

          <Row onPress={() => router.push("/help/using-ai")}>
            <RowText>Using the AI companion</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>

          <Row onPress={() => router.push("/help/community-safety")}>
            <RowText>Staying safe in the community</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>
        </Card>

        <Card>
          <SectionLabel>Frequently asked questions</SectionLabel>

          <Row onPress={() => router.push("/help/data-privacy")}>
            <RowText>Is my data private?</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>

          <Row onPress={() => router.push("/help/editing-entries")}>
            <RowText>Can I edit or delete entries?</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>

          <Row onPress={() => router.push("/help/changing-preferences")}>
            <RowText>How do I change my preferences?</RowText>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </Row>
        </Card>

        <Card>
          <SectionLabel>Contact support</SectionLabel>

          <Paragraph>
            If something isn’t working or you need help, you can reach us at:
          </Paragraph>

          <Row onPress={() => router.push("/help/contact-support")}>
            <RowText style={{ color: "#6c63ff", fontWeight: "600" }}>
              support@breathewell.app
            </RowText>
            <Ionicons name="open-outline" size={20} color="#6c63ff" />
          </Row>
        </Card>

        <Card>
          <SectionLabel>If you need urgent help</SectionLabel>

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
