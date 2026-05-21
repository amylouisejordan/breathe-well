import { View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAuth } from "../utils/useAuth";
import {
  SSection,
  Avatar2,
  Card,
  Container,
  Footer,
  Header2,
  HeaderCard,
  Name,
  Row,
  SectionTitle,
  Subtext,
  RowIcon,
  RowText,
} from "./styled";

const ProfileScreen = () => {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] ?? user?.email ?? "friend";

  return (
    <Container>
      <HeaderCard>
        <Header2>
          <Avatar2>
            <Ionicons name="person" size={40} color="#fff" />
          </Avatar2>

          <View>
            <Name>Welcome back{firstName ? `, ${firstName}` : ""}</Name>
            <Subtext>Your wellbeing and app settings</Subtext>
          </View>
        </Header2>
      </HeaderCard>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Section title="Health">
          <SettingRow
            icon="pulse"
            label="Symptom history"
            href="/history"
            accessibilityHint="View your logged symptoms over time"
          />
          <SettingRow
            icon="leaf"
            label="Breathing preferences"
            href="/profile/breathing-preferences"
            accessibilityHint="Adjust your breathing support settings"
          />
          <SettingRow
            icon="medkit"
            label="My medications"
            href="/profile/medications"
            accessibilityHint="View and manage your medication list"
          />
        </Section>

        <Section title="App">
          <SettingRow
            icon="notifications"
            label="Notifications"
            href="/profile/notifications"
            accessibilityHint="Manage reminders and alerts"
          />
          <SettingRow
            icon="lock-closed"
            label="Privacy & data"
            href="/profile/privacy"
            accessibilityHint="Review how your data is used"
          />
          <SettingRow
            icon="color-palette"
            label="Appearance"
            href="/profile/appearance"
            accessibilityHint="Change theme and text size"
          />
        </Section>

        <Section title="Account">
          <SettingRow
            icon="person-circle"
            label="Manage account"
            href="/profile/account"
            accessibilityHint="View and edit your account details"
          />
          <SettingRow
            icon="help-circle"
            label="Help & Support"
            href="/profile/help"
            accessibilityHint="Get assistance with the app"
          />
          <SettingRow
            icon="log-out"
            label="Sign out"
            danger
            accessibilityHint="Sign out of your account"
          />
        </Section>

        <Footer>BreatheWell • v1.0.0</Footer>
      </ScrollView>
    </Container>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <SSection>
    <SectionTitle>{title}</SectionTitle>
    <Card>{children}</Card>
  </SSection>
);

interface SettingRowProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  danger?: boolean;
  href?: string;
  accessibilityHint?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  danger,
  href,
  accessibilityHint,
}) => {
  const RowContent = (
    <Row>
      <RowIcon>
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#d9534f" : "#6c63ff"}
        />
      </RowIcon>

      <RowText danger={danger} accessibilityRole="text">
        {label}
      </RowText>

      <Ionicons name="chevron-forward" size={18} color="#bbb" />
    </Row>
  );

  if (href) {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityHint={accessibilityHint}
          activeOpacity={0.6}
        >
          {RowContent}
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      activeOpacity={0.6}
    >
      {RowContent}
    </TouchableOpacity>
  );
};

export default ProfileScreen;
