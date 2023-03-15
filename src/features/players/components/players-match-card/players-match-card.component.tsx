import React, { FC } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { TabParamList } from "../../../../infrastructure/navigation/app.navigator";
import { PlayerMatchCard } from "../player-match-card/player-match-card.component";
import {
  PlayersCardContainer,
  TextDate,
  TextSets,
  TextStatus,
} from "./players-match-card.styles";

type MatchPlayersCardProps = {
  homeId: number;
  homeSets: number;
  awayId: number;
  awaySets: number;
  winnerId: number;
  status: string;
  date: string;
};

export const PlayersMatchCard: FC<MatchPlayersCardProps> = ({
  homeId,
  homeSets,
  awayId,
  awaySets,
  winnerId,
  status,
  date,
}) => {
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const parsedDate = new Date(date).toLocaleDateString("en-CA");

  return (
    <PlayersCardContainer>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RankList", {
            screen: "PlayerDetails",
            params: { playerId: homeId },
          })
        }
      >
        <PlayerMatchCard playerId={homeId} winnerId={winnerId} />
      </TouchableOpacity>
      <View>
        <TextDate variant="caption">{parsedDate}</TextDate>
        <TextSets variant="body">
          {homeSets} - {awaySets}
        </TextSets>
        <TextStatus variant="caption">{status}</TextStatus>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RankList", {
            screen: "PlayerDetails",
            params: { playerId: awayId },
          })
        }
      >
        <PlayerMatchCard playerId={awayId} winnerId={winnerId} />
      </TouchableOpacity>
    </PlayersCardContainer>
  );
};
