import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Row, RowIcon, RowText, Section, Subtext } from "./styled";
import { Container, Card, Title } from "../styled";

const AccountScreen = () => {
  return (
    <Container>
      <Title accessibilityRole="header">Manage Account</Title>
      <Subtext>Update your personal details and account preferences</Subtext>

      <Card
        style={{ marginTop: 0 }}
        accessibilityRole="list"
        accessibilityLabel="Account settings options"
      >
        <SettingRow
          icon="person-circle"
          label="Edit profile"
          hint="Opens form to update your name or details"
        />
        <SettingRow
          icon="mail"
          label="Change email"
          hint="Opens form to update your email address"
        />
        <SettingRow
          icon="key"
          label="Change password"
          hint="Opens form to update your password"
        />
      </Card>

      <Section>
        <Card
          accessibilityRole="list"
          accessibilityLabel="Critical account actions"
        >
          <SettingRow
            icon="trash"
            label="Delete account"
            danger
            hint="Permanently removes all of your data from BreatheWell"
          />
        </Card>
      </Section>
    </Container>
  );
};

const SettingRow = ({
  icon,
  label,
  hint,
  danger,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  hint?: string;
  danger?: boolean;
}) => (
  <Row
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityHint={hint}
    accessibilityState={{ destructive: danger }}
    activeOpacity={0.6}
  >
    <RowIcon importantForAccessibility="no" accessibilityElementsHidden={true}>
      <Ionicons name={icon} size={22} color={danger ? "#d9534f" : "#4a90e2"} />
    </RowIcon>
    <RowText
      style={danger && { color: "#d9534f" }}
      importantForAccessibility="no"
      accessibilityElementsHidden={true}
    >
      {label}
    </RowText>
    <Ionicons
      name="chevron-forward"
      size={18}
      color="#bbb"
      importantForAccessibility="no"
      accessibilityElementsHidden={true}
    />
  </Row>
);

export default AccountScreen;
