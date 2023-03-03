import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { theme } from "../../../../infrastructure/theme";

export const circleContainerStyles = `
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  shadow-color: black;
  shadow-opacity: 0.9;
  elevation: 10;
`;

export const CircleContainer = styled.View`
  ${circleContainerStyles}
  background-color: #f2f2f2;
`;

export const CircleContainerFavorites = styled.View`
  ${circleContainerStyles}
  background-color: #ef5350;
`;
