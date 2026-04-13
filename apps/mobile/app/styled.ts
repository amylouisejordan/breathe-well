import styled from "styled-components/native";
import { TouchableOpacity, TextInput } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #fafafb;
  padding: 20px;
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 40 },
})``;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #6c63ff;
  margin-bottom: 4px;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: #666;
  margin-bottom: 20px;
`;

export const Divider = styled.View`
  height: 1px;
  background: #f1f1f5;
  margin: 16px 0;
`;

export const AnimatedCardWrapper = styled.View`
  width: 100%;
`;

export const OptionCard = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 18px;
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

export const CancelText = styled.Text`
  color: #999;
  font-size: 16px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;

  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
`;

export const Severity = styled.Text`
  color: #6c63ff;
  font-weight: 700;
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

type TagProps = { active?: boolean };

export const Tag = styled(TouchableOpacity)<TagProps>`
  padding-vertical: 10px;
  padding-horizontal: 16px;
  border-radius: 20px;
  background-color: ${(props: { active: any }) =>
    props.active ? "#6c63ff" : "#f0f0f0"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 34px;
`;

export const TagText = styled.Text<TagProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }: TagProps) => (active ? "#fff" : "#6c63ff")};
`;

export const TagCount = styled.Text`
  font-size: 13px;
  color: #6c63ff;
`;

export const Input = styled(TextInput)`
  border-width: 1px;
  border-color: #e5e5e5;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  background-color: #fafafa;
  color: #333;
`;

export const TextArea = styled(Input)`
  height: 100px;
  text-align-vertical: top;
`;

export const ResetButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin-bottom: 16px;
  gap: 6px;
`;

export const ResetText = styled.Text`
  color: #6c63ff;
  font-size: 15px;
  font-weight: 600;
`;

export const SaveButton = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: #6c63ff;
  padding-vertical: 16px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.5 : 1)};
`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
`;

export const Field = styled.View`
  margin-bottom: 20px;
`;

export const EmotionLabel = styled.Text<{ active?: boolean }>`
  font-size: 14px;
  line-height: 16px;
  color: ${(props: { active: any }) => (props.active ? "#333" : "#555")};
  font-weight: 500;
  text-align: center;
`;
