import React, { FC } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import {
  Match,
  MatchCardViewModel,
} from "../../../../services/matches/matches.service";
import {
  CardContainer,
  PlayerContainer,
  PlayerName,
  PlayerSets,
  TextWinner,
} from "./match-result-card.styles";

type MatchResultCardProps = {
  match: MatchCardViewModel;
};

export const MatchResultCard: FC<MatchResultCardProps> = ({ match }) => {
  const {
    homeId,
    homePlayer,
    homeSets,
    awayId,
    awayPlayer,
    awaySets,
    winnerId,
  } = match;

  return (
    <Spacer position="top" size="medium">
      <CardContainer>
        <Card.Content>
          <PlayerContainer>
            <PlayerName>
              {homeId === winnerId ? (
                <TextWinner variant="body">
                  {homePlayer
                    ? `${homePlayer.name} (${homePlayer.ranking})`
                    : "No home player"}
                </TextWinner>
              ) : (
                <Text variant="body">
                  {homePlayer
                    ? `${homePlayer.name} (${homePlayer.ranking})`
                    : "No home player"}
                </Text>
              )}
            </PlayerName>
            <PlayerSets>
              {homeId === winnerId ? (
                <TextWinner variant="body">{homeSets}</TextWinner>
              ) : (
                <Text variant="body">{homeSets}</Text>
              )}
            </PlayerSets>
          </PlayerContainer>
          <PlayerContainer>
            <PlayerName>
              {awayId === winnerId ? (
                <TextWinner variant="body">
                  {awayPlayer
                    ? `${awayPlayer.name} (${awayPlayer.ranking})`
                    : "No away player"}
                </TextWinner>
              ) : (
                <Text variant="body">
                  {awayPlayer
                    ? `${awayPlayer.name} (${awayPlayer.ranking})`
                    : "No away player"}
                </Text>
              )}
            </PlayerName>
            <PlayerSets>
              {awayId === winnerId ? (
                <TextWinner variant="body">{awaySets}</TextWinner>
              ) : (
                <Text variant="body">{awaySets}</Text>
              )}
            </PlayerSets>
          </PlayerContainer>
        </Card.Content>
      </CardContainer>
    </Spacer>
  );
};
