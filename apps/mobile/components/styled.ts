import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const ParallaxContainer = styled(Animated.ScrollView)`
  flex: 1;
`;

export const Header = styled(Animated.View)`
  height: 250px;
  overflow: hidden;
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px;
  gap: 16px;
  overflow: hidden;
`;

export const DefaultText = styled.Text`
  font-size: 16px;
  line-height: 24px;
`;

export const DefaultSemiBoldText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;

export const TitleText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  line-height: 32px;
`;

export const SubtitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const LinkText = styled.Text`
  font-size: 16px;
  line-height: 30px;
  color: #0a7ea4;
`;
