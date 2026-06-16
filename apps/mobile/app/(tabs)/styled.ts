import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 24px;
  margin-top: 6px;
`;

export const Greeting = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
`;

export const Subline = styled.Text`
  font-size: 13px;
  color: #f0f0ff;
  margin-top: 2px;
`;

export const Bell = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const Dot = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #ff4d4d;
`;

export const AddButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #4a90e2;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  shadow-color: #4a90e2;
  shadow-opacity: 0.4;
  shadow-radius: 12px;
  shadow-offset: 0px 6px;
  elevation: 10;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #fafafb;
  padding-horizontal: 20px;
  padding-top: 28px;
`;

export const Header = styled.View`
  margin-bottom: 28px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #4a90e2;
`;

export const Subtext = styled.Text`
  font-size: 15px;
  color: #666;
  margin-top: 4px;
`;

export const MessageRow = styled.View<{ side?: "left" | "right" }>`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 14px;
  justify-content: ${({ side }: { side?: "left" | "right" }) =>
    side === "right" ? "flex-end" : "flex-start"};
`;

export const Avatar = styled.View<{ user?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ user }: { user?: boolean }) =>
    user ? "#4a90e2" : "#F4D6D2"};
  align-items: center;
  justify-content: center;
  margin-right: ${({ user }: { user?: boolean }) => (user ? "0" : "8px")};
  margin-left: ${({ user }: { user?: boolean }) => (user ? "8px" : "0")};
`;

export const Message = styled.View<{ user?: boolean }>`
  padding: 14px;
  border-radius: 18px;
  max-width: 75%;
  background-color: ${({ user }: { user?: boolean }) =>
    user ? "#4a90e2" : "#fff"};
  border-width: ${({ user }: { user?: boolean }) => (user ? "0" : "1px")};
  border-color: ${({ user }: { user?: boolean }) =>
    user ? "transparent" : "#F4D6D2"};
`;

export const MessageText = styled.Text<{ user?: boolean }>`
  font-size: 16px;
  line-height: 22px;
  color: ${({ user }: { user?: boolean }) => (user ? "#fff" : "#333")};
`;

export const FooterNote = styled.Text`
  text-align: center;
  color: #999;
  margin-top: 10px;
  font-size: 13px;
`;

export const InputBar = styled.View`
  position: absolute;
  bottom: 100px;
  left: 20px;
  right: 20px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 28px;
  padding-horizontal: 16px;
  padding-vertical: 10px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding-right: 10px;
`;

export const SendButton = styled.TouchableOpacity`
  padding: 6px;
`;

export const HeaderCard = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 3; /* Android shadow */
`;

export const Header2 = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar2 = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #4a90e2;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
`;

export const Name = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #222;
`;

export const SSection = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 12px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding-horizontal: 12px;
  padding-vertical: 4px;
  shadow-color: #000;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 2;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f4d6d2;
`;

export const RowIcon = styled.View`
  width: 28px;
`;

export const RowText = styled.Text`
  flex: 1;
  font-size: 17px;
  color: #333;
  margin-left: 10px;
`;

export const DangerText = styled.Text`
  color: #d9534f;
`;

export const Footer = styled.Text`
  text-align: center;
  color: #aaa;
  font-size: 13px;
  margin-top: 8px;
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: flex-end;
`;

export const SheetGradient = styled(LinearGradient).attrs({
  colors: ["#4a90e2", "#726dff", "#8a84ff"],
})`
  margin-top: auto;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding-top: 32px;
  padding-bottom: 48px;
  padding-horizontal: 24px;
`;

export const Pill = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  padding-vertical: 12px;
  padding-horizontal: 20px;
  border-radius: 24px;
  margin-bottom: 12px;
`;

export const PillText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 12px;
`;
