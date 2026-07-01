import styled from "styled-components/native";

export const Screen = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 0,
    paddingBottom: 120,
    paddingTop: 8,
  },
})`
  flex: 1;
  background: #fafafb;
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
