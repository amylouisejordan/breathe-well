import { Ionicons } from "@expo/vector-icons";
import {
  Card,
  Container,
  Row,
  RowIcon,
  RowText,
  Section,
  Subtext,
  Title,
} from "./styled";

const AccountScreen = () => {
  return (
    <Container>
      <Title>Manage Account</Title>
      <Subtext>Update your personal details and account preferences</Subtext>

      <Card style={{ marginTop: 0 }}>
        <SettingRow
          icon="person-circle"
          label="Edit profile"
          hint="Update your name or details"
        />
        <SettingRow
          icon="mail"
          label="Change email"
          hint="Update your email address"
        />
        <SettingRow
          icon="key"
          label="Change password"
          hint="Update your password"
        />
      </Card>

      <Section>
        <Card>
          <SettingRow
            icon="trash"
            label="Delete account"
            danger
            hint="Permanently remove your account"
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
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityHint={hint}
    activeOpacity={0.6}
  >
    <RowIcon>
      <Ionicons name={icon} size={22} color={danger ? "#d9534f" : "#6c63ff"} />
    </RowIcon>
    <RowText style={danger && { color: "#d9534f" }}>{label}</RowText>
    <Ionicons name="chevron-forward" size={18} color="#bbb" />
  </Row>
);

export default AccountScreen;
