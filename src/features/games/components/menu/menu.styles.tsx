import styled from "styled-components/native";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export const ButtonsContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GrowIconButton = styled(IconButton)`
  flex-grow: 1;
`;
