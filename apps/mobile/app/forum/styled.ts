import styled from "styled-components/native";

export const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 12,
    paddingBottom: 120,
    paddingTop: 8,
  },
})`
  flex: 1;
  background: #fafafb;
`;

export const Card = styled.TouchableOpacity`
  background: #fff;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid #f3f3f7;
  margin-bottom: 16px;

  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 2;
`;

export const SmallCard = styled.TouchableOpacity`
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #f1f1f5;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #333;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: #666;
`;

export const Timestamp = styled.Text`
  font-size: 13px;
  color: #aaa;
  margin-top: 4px;
`;

export const BodyText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: #444;
`;

export const RepliesHeader = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #6c63ff;
  margin-bottom: 12px;
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

export const AvatarText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #6c63ff;
`;

export const InputCard = styled.View`
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #f1f1f5;
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  background: #fafafa;
  padding: 14px;
  border-radius: 12px;
  min-height: 80px;
  text-align-vertical: top;
  font-size: 15px;
  color: #333;
`;

export const Button = styled.TouchableOpacity`
  background: #6c63ff;
  padding: 14px;
  border-radius: 12px;
  align-items: center;
  margin-top: 12px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EditButton = styled.TouchableOpacity`
  padding: 8px 14px;
  background: #ecebff;
  border-radius: 10px;
`;

export const EditButtonText = styled.Text`
  color: #6c63ff;
  font-weight: 600;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 8px 14px;
  background: #ffe6e6;
  border-radius: 10px;
`;

export const DeleteButtonText = styled.Text`
  color: #cc0000;
  font-weight: 600;
`;

export const BannerButton = styled.TouchableOpacity`
  background: #ecebff;
  padding: 18px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  border: 1px solid #dcd9ff;
`;

export const BannerButtonText = styled.Text`
  color: #6c63ff;
  font-size: 17px;
  font-weight: 700;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
`;

export const ActionButton = styled.TouchableOpacity`
  background: #6c63ff;
  padding: 12px 20px;
  border-radius: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
`;

export const ActionButtonSecondary = styled.TouchableOpacity`
  background: #ecebff;
  padding: 12px 20px;
  border-radius: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;

export const ActionButtonTextSecondary = styled.Text`
  color: #6c63ff;
  font-size: 15px;
  font-weight: 700;
`;

export const SortDropdown = styled.View`
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e6e6ef;
  margin-top: 8px;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

export const SortOption = styled.TouchableOpacity`
  padding: 14px 16px;
  background: #fff;
`;

export const SortOptionText = styled.Text`
  font-size: 15px;
  color: #333;
`;

export const SortOptionTextActive = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #6c63ff;
`;
