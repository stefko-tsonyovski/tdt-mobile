import { Text } from "../../../../components/typography/text.component";
import { PlayerInTeam } from "../../../../services/players/players.service";
import { FC } from "react";
import { View } from "react-native";
import { colors } from "../../../../infrastructure/theme/colors";
import { Avatar, Button } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { TeamPlayerBalls } from "../team-player-balls/team-player-balls.component";
import {
  CardHeaderContainer,
  Index,
  TeamPlayerCardContainer,
  TeamPlayerImage,
  TeamPlayerImageContainer,
  TeamPlayerName,
  TeamPlayerPointsWonContainer,
} from "./team-player-card.styles";
import { MultiplierText } from "../team-player-balls/team-player-balls.styles";
import React from "react";

export type TeamPlayerCardProps = {
  player: PlayerInTeam;
  index: number;
  disabled?: boolean;
};

export const TeamPlayerCard: FC<TeamPlayerCardProps> = ({
  player,
  index,
  disabled,
}) => {
  return (
    <>
      <TeamPlayerCardContainer>
        <CardHeaderContainer>
          <Index variant="body">{index}</Index>
          <TeamPlayerPointsWonContainer>
            <MultiplierText variant="body">
              {player.pointsWon.toFixed(0)}PT
            </MultiplierText>
          </TeamPlayerPointsWonContainer>
        </CardHeaderContainer>
        <Spacer position="top" size="medium">
          <TeamPlayerImageContainer>
            <TeamPlayerImage size={70} source={{ uri: player.imageUrl }} />
          </TeamPlayerImageContainer>
        </Spacer>
        <TeamPlayerName variant="body">
          {player.name.split(" ")[1]}
        </TeamPlayerName>
      </TeamPlayerCardContainer>
      <Spacer position="top" size="small">
        <TeamPlayerBalls disabled={disabled} player={player} />
      </Spacer>
    </>
  );
};
