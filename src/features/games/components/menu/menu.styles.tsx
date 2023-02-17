import styled from "styled-components/native";
import { View } from "react-native";
import { Divider, IconButton } from "react-native-paper";

export const ButtonsContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GrowIconButton = styled(IconButton)`
  flex-grow: 1;
`;

export const WeeksMenuContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const MenuDivider = styled(Divider)`
  background-color: ${(props) => props.theme.colors.text.inverse};
  height: 3px;
`;
