import { Colors } from "react-native-paper";
import styled from "styled-components/native";
import { circleContainerStyles } from "../../../tournaments/components/tournament-item-card/tournament-item-card.styles";

export const DateContainer = styled.View`
  flex: 0.25;
  justify-content: center;
`;

export const ResultStatusContainer = styled.View`
  flex: 0.15;
  justify-content: center;
  align-items: center;
`;

export const WinnerStatus = styled.View`
  ${circleContainerStyles}
  backgroundColor: ${Colors.green300}
    color: white;
`;

export const LoserStatus = styled.View`
  ${circleContainerStyles}
  backgroundColor: ${Colors.red300}
    color: white;
`;

export const PendingStatus = styled.View`
  background-color: ${Colors.orange300};
  color: white;
  padding: 5px;
`;
