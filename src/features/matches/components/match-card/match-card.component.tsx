import { useAtom } from "jotai";
import React, { FC, useContext } from "react";
import CountryFlag from "react-native-country-flag";
import { Card, Colors, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  useCreateFavorite,
  useDeleteFavorite,
} from "../../../../services/favorites/favorites.service";
import { MatchCardViewModel } from "../../../../services/matches/matches.service";
import { selectedDateAtom } from "../../../../utils/atoms";
import { TextWinner } from "../match-result-card/match-result-card.styles";
import {
  FavoriteContainer,
  MatchContainer,
  PlayerCountryContainer,
  PlayerNameContainer,
  PlayerResultContainer,
  PlayerResultsContainer,
  PlayerSetsContainer,
} from "./match-card.styles";

type MatchCardProps = {
  match: MatchCardViewModel;
};

export const MatchCard: FC<MatchCardProps> = ({ match }) => {
  const {
    id,
    favoriteId,
    homeId,
    homePlayer,
    homeSets,
    awayId,
    awayPlayer,
    awaySets,
    winnerId,
  } = match;
  const [date] = useAtom(selectedDateAtom);
  const { user } = useContext(AuthenticationContext);
  const { mutate: createFavorite } = useCreateFavorite(id, date);
  const { mutate: deleteFavorite } = useDeleteFavorite(id, date);

  const unMarkAsFavorite = () => {
    deleteFavorite({ favoriteId, email: user?.email });
  };

  const markAsFavorite = () => {
    createFavorite({
      matchId: id,
      email: user?.email,
    });
  };

  console.log(favoriteId);

  return (
    <Card>
      <MatchContainer>
        <FavoriteContainer>
          {favoriteId ? (
            <IconButton
              icon="star"
              color={Colors.orange300}
              size={30}
              onPress={unMarkAsFavorite}
            />
          ) : (
            <IconButton
              icon="star-outline"
              color={Colors.grey300}
              size={30}
              onPress={markAsFavorite}
            />
          )}
        </FavoriteContainer>
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
      </MatchContainer>
    </Card>
  );
};
