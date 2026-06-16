import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fafafb;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 20px;
`;

export const Paragraph = styled.Text`
  font-size: 16px;
  color: #444;
  margin-bottom: 16px;
  line-height: 22px;
`;

export const Step = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #4a90e2;
  padding-vertical: 14px;
  border-radius: 12px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
