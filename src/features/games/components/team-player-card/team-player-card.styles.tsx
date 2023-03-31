import { View } from "react-native";
import { Avatar } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const TeamPlayerCardContainer = styled(View)`
  max-height: 150px;
  max-width: 150px;
  background-color: ${(props) => props.theme.colors.ui.card};
  border-radius: 10px;
  margin: 0 5px;
  padding: 5px;
`;

export const CardHeaderContainer = styled(View)`
  flex-direction: row;
`;

export const Index = styled(Text)`
  flex-grow: 1;
`;

export const TeamPlayerPointsWonContainer = styled(View)`
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 5px;
`;

export const TeamPlayerImageContainer = styled(View)`
  align-items: center;
`;

export const TeamPlayerImage = styled(Avatar.Image)`
  background-color: ${(props) => props.theme.colors.ui.card};
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.bg.primary};
`;

export const TeamPlayerName = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;
