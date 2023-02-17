import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const CardContainer = styled(Card)`
  background-color: #c4c4c4;
`;

export const PlayerContainer = styled.View`
  flex-direction: row;
`;

export const PlayerName = styled.View`
  flex: 0.9;
`;

export const PlayerSets = styled.View`
  flex: 0.1;
  align-items: flex-end;
`;

export const TextWinner = styled(Text)`
  font-weight: 900;
`;
