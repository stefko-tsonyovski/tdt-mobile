import styled from "styled-components/native";
import { View, Image } from "react-native";
import { Colors } from "react-native-paper";

export const CardHeaderPlayerContainer = styled(View)`
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${Colors.grey300};
`;

export const PlayerImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 15px;
`;

export const PlayerDetailsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: "red";
`;
