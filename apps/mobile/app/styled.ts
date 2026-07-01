import styled from "styled-components/native";
import { TouchableOpacity, TextInput } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #fafafb;
  padding: 24px 16px 0;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: #4a90e2;
  margin-bottom: 10px;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: #666;
  margin-bottom: 20px;
`;

export const Divider = styled.View`
  height: 1px;
  background: #f4d6d2;
  margin: 16px 0;
`;

export const Card = styled.View`
  background: #fff;
  padding: 14px 18px;
  border-radius: 22px;
  border: 1px solid #f3f3f7;
  margin-bottom: 16px;

  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 2;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Input = styled(TextInput)`
  border-width: 1px;
  border-color: #e5e5e5;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  background-color: #fafafa;
  color: #333;
  margin-bottom: 20px;
`;

export const Avatar = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: #ecebff;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const Paragraph = styled.Text`
  font-size: 16px;
  color: #444;
  margin-bottom: 16px;
  line-height: 22px;
`;

export const AvatarText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #4a90e2;
`;

export const Button = styled.TouchableOpacity`
  background-color: #4a90e2;
  padding-vertical: 14px;
  border-radius: 12px;
  align-items: center;
  margin-top: 12px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

export const DeleteButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
  flex-direction: row;
  background-color: #d9534f;
  padding-vertical: 16;
  border-radius: 28;
  justify-content: center;
  align-items: center;
  gap: 8;
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
`;
