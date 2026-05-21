import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fafafb;
  padding: 28px 20px 0 20px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #6c63ff;
`;

export const Subtext = styled.Text`
  font-size: 15px;
  color: #666;
  margin-top: 4px;
  margin-bottom: 28px;
`;

export const Card = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 4px 12px;
  shadow-color: #000;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 2;
  margin-top: 20px;
`;

export const Section = styled.View`
  margin-top: 32px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #d9534f;
  margin-bottom: 12px;
`;

export const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
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
  font-weight: 600;
`;

export const SectionLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  flex-direction: row;
  background-color: #6c63ff;
  padding-vertical: 16px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Hint = styled.Text`
  font-size: 13px;
  color: #777;
  margin-top: 10px;
`;

export const Paragraph = styled.Text`
  font-size: 15;
  color: #444;
  margin-bottom: 12;
  line-height: 22;
`;

export const IconWrap = styled.View`
  width: 40px;
  align-items: center;
  margin-right: 12px;
`;

export const CardMiddle = styled.View`
  flex: 1;
`;

export const CardTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #333;
`;

export const CardSub = styled.Text`
  font-size: 14px;
  color: #777;
  margin-top: 2px;
`;

export const CardNotes = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 2px;
`;

export const BulletWrap = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 6px;
`;

export const Bullet = styled.Text`
  font-size: 16px;
  margin-right: 8px;
  color: #6c63ff;
`;

export const BulletText = styled.Text`
  flex: 1;
  font-size: 15px;
  color: #444;
`;
