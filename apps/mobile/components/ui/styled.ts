import styled from "styled-components";
import { TouchableOpacity, View } from "react-native";

export const CollapsibleHeading = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const CollapsibleContent = styled(View)`
  margin-top: 6px;
  margin-left: 24px;
`;
