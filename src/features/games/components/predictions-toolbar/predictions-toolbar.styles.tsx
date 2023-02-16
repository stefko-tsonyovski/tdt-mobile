import { View } from "react-native";
import styled from "styled-components/native";

export const PredictionsToolbarContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  shadow-color: ${(props) => props.theme.colors.text.shadow};
  shadow-offset: 5px 10px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
`;

export const PredictionPointsContainer = styled(View)`
  align-items: center;
  flex-grow: 1;
`;
