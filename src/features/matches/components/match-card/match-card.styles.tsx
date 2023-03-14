import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const MatchContainer = styled(Card.Content)`
  flex-direction: row;
  align-items: center;
`;

export const FavoriteContainer = styled.View`
  flex: 0.2;
  align-items: center
  width: 100%;
  height: 100%;
`;

export const PlayerResultsContainer = styled.View`
  flex: 0.8;
`;

export const PlayerResultContainer = styled.View`
  flex-direction: row;
`;

export const PlayerCountryContainer = styled.View`
  flex: 0.2;
`;

export const PlayerNameContainer = styled.View`
  flex: 0.7;
`;

export const PlayerSetsContainer = styled.View`
  flex: 0.1;
`;
