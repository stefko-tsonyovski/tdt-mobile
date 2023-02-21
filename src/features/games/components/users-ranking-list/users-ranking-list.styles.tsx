import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const InfoBoxContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[2]};
  border-radius: 10px;
`;

export const InfoBoxContainerText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.title};
`;
