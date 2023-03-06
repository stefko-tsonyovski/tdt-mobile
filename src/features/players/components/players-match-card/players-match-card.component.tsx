import React, { FC } from "react";
import { View } from "react-native";
import { Colors } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { PlayerMatchCard } from "../player-match-card/player-match-card.component";
import {
  PlayersCardContainer,
  TextDate,
  TextSets,
  TextStatus,
} from "./players-match-card.styles";

type MatchPlayersCardProps = {
  homeId: number;
  homeSets: string;
  awayId: number;
  awaySets: string;
  status: string;
  date: string;
};

export const PlayersMatchCard: FC<MatchPlayersCardProps> = ({
  homeId,
  homeSets,
  awayId,
  awaySets,
  status,
  date,
}) => {
  const parsedDate = new Date(date).toLocaleDateString("en-CA");

  return (
    <PlayersCardContainer>
      <PlayerMatchCard playerId={homeId} />
      <View>
        <TextDate variant="caption">{parsedDate}</TextDate>
        <TextSets variant="body">
          {homeSets} - {awaySets}
        </TextSets>
        <TextStatus variant="caption">{status}</TextStatus>
      </View>
      <PlayerMatchCard playerId={awayId} />
    </PlayersCardContainer>
  );
};
