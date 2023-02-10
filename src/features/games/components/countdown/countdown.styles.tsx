import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const TabButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.bg.primary};
`;

export const TabButtonText = styled(Text)`
  color: ${(props) => props.theme.colors.bg.primary};
`;
