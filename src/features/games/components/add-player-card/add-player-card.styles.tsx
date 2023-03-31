import { View } from "react-native";
import styled from "styled-components/native";

export const AddPlayerCardContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.ui.card};
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 0 5px;
`;

export const AddButtonContainer = styled(View)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;
