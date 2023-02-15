import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const TournamentContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.ui.card};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

export const TournamentName = styled(Text)`
  flex-grow: 1;
  font-size: ${(props) => props.theme.fontSizes.title};
`;
