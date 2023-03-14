import React, { FC } from "react";
import CountryFlag from "react-native-country-flag";
import { Card, Colors } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { MatchCardViewModel } from "../../../../services/matches/matches.service";
import {
  MatchContainer,
  PlayerCountryContainer,
  PlayerNameContainer,
  PlayerResultContainer,
  PlayerResultsContainer,
  PlayerSetsContainer,
} from "../match-card/match-card.styles";
import { TextWinner } from "../match-result-card/match-result-card.styles";
import {
  DateContainer,
  ResultStatusContainer,
  LoserStatus,
  PendingStatus,
  WinnerStatus,
} from "./last-match-card.styles";

type LastMatchCardProps = {
  match: MatchCardViewModel;
  playerId?: number;
};

export const LastMatchCard: FC<LastMatchCardProps> = ({ match, playerId }) => {
  const {
    favoriteId,
    date,
    status,
    homeId,
    homePlayer,
    homeSets,
    awayId,
    awayPlayer,
    awaySets,
    winnerId,
  } = match;

  const matchDate = new Date(date);
  const currentDate = new Date();

  const parsedDate =
    matchDate.getFullYear() !== currentDate.getFullYear()
      ? matchDate.getFullYear()
      : matchDate.toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
        });

  return (
    <Card style={favoriteId ? { backgroundColor: Colors.lightBlue100 } : {}}>
      <MatchContainer>
        <DateContainer>
          <Text variant="body">{parsedDate}</Text>
        </DateContainer>
        <PlayerResultsContainer>
          <Spacer position="bottom" size="medium">
            <PlayerResultContainer>
              <PlayerCountryContainer>
                <CountryFlag size={25} isoCode={homePlayer.countryKey} />
              </PlayerCountryContainer>
              <PlayerNameContainer>
                {homeId === winnerId ? (
                  <TextWinner variant="body">{homePlayer.name}</TextWinner>
                ) : (
                  <Text variant="body">{homePlayer.name}</Text>
                )}
              </PlayerNameContainer>
              <PlayerSetsContainer>
                {homeId === winnerId ? (
                  <TextWinner variant="body">{homeSets}</TextWinner>
                ) : (
                  <Text variant="body">{homeSets}</Text>
                )}
              </PlayerSetsContainer>
            </PlayerResultContainer>
          </Spacer>
          <PlayerResultContainer>
            <PlayerCountryContainer>
              <CountryFlag size={25} isoCode={awayPlayer.countryKey} />
            </PlayerCountryContainer>
            <PlayerNameContainer>
              {awayId === winnerId ? (
                <TextWinner variant="body">{awayPlayer.name}</TextWinner>
              ) : (
                <Text variant="body">{awayPlayer.name}</Text>
              )}
            </PlayerNameContainer>
            <PlayerSetsContainer>
              {awayId === winnerId ? (
                <TextWinner variant="body">{awaySets}</TextWinner>
              ) : (
                <Text variant="body">{awaySets}</Text>
              )}
            </PlayerSetsContainer>
          </PlayerResultContainer>
        </PlayerResultsContainer>
        {playerId && (
          <ResultStatusContainer>
            {status === "finished" ? (
              winnerId === playerId ? (
                <WinnerStatus>
                  <Text variant="body">W</Text>
                </WinnerStatus>
              ) : (
                <LoserStatus>
                  <Text variant="body">L</Text>
                </LoserStatus>
              )
            ) : (
              <PendingStatus>
                <Text variant="body">P</Text>
              </PendingStatus>
            )}
          </ResultStatusContainer>
        )}
      </MatchContainer>
    </Card>
  );
};
