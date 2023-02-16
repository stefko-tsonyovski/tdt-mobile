import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";
import { Bracket } from "../../../../services/brackets/brackets.service";
import { Player } from "../../../../services/players/players.service";

export const BracketName = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export const BracketCardContainer = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.bracket};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const BracketPlayersContainer = styled(View)`
  flex-grow: 1;
`;

export const VerifyContainer = styled(View)`
  justify-content: center;
`;

export const PlayerContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export type PlayerTextProps = {
  player: Player;
  bracket: Bracket;
};

export const PlayerText = styled(Text)<PlayerTextProps>`
  font-weight: ${({ player, bracket }) =>
    player && player.id === bracket.winnerId ? "bold" : "normal"};
`;
