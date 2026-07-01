import { TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const EmotionLabel = styled.Text<{ active?: boolean }>`
  font-size: 14px;
  line-height: 16px;
  color: ${({ active }: { active?: boolean }) => (active ? "#333" : "#555")};
  font-weight: 500;
  text-align: center;
`;

export const SaveButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  flex-direction: row;
  background-color: #4a90e2;
  padding-vertical: 16px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  opacity: ${({ disabled }: { disabled?: boolean }) => (disabled ? 0.5 : 1)};
`;

export const ResetButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin-bottom: 16px;
  gap: 6px;
`;

export const ResetText = styled.Text`
  color: #4a90e2;
  font-size: 15px;
  font-weight: 600;
`;

type TagProps = { active?: boolean };

export const Tag = styled(TouchableOpacity)<TagProps>`
  padding-vertical: 10px;
  padding-horizontal: 16px;
  border-radius: 20px;
  background-color: ${({ active }: { active?: boolean }) =>
    active ? "#4a90e2" : "#f0f0f0"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 34px;
`;

export const TagText = styled.Text<TagProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }: TagProps) => (active ? "#fff" : "#4a90e2")};
`;

export const TagCount = styled.Text`
  font-size: 13px;
  color: #4a90e2;
`;

export const ScaleHint = styled.Text`
  font-size: 13px;
  color: #777;
  margin-top: 6px;
`;

export const TagWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`;

export const SliderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const SeverityNumber = styled.Text`
  width: 32px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const Severity = styled.Text`
  color: #4a90e2;
  font-weight: 700;
`;

export const CancelText = styled.Text`
  color: #999;
  font-size: 16px;
`;

export const FooterNote = styled.Text`
  text-align: center;
  font-size: 13px;
  color: #999;
  margin-top: 8px;
`;

export const CancelButton = styled(TouchableOpacity)`
  margin-top: auto;
  align-items: center;
  padding-vertical: 14px;
`;

export const TextWrap = styled.View`
  flex: 1;
`;

export const OptionTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #333;
`;

export const OptionText = styled.Text`
  font-size: 14px;
  color: #777;
  margin-top: 4px;
`;

export const OptionCard = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 18px;
  border-width: 1;
  border-color: #f4d6d2;
  padding: 20px;
  margin-bottom: 18px;

  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
`;

export const IconWrap = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: #f1f0ff;
  align-items: center;
  justify-content: center;
  margin-right: 18px;
`;

export const AnimatedCardWrapper = styled.View`
  width: 100%;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
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

export const TextArea = styled(Input)`
  height: 100px;
  text-align-vertical: top;
`;
