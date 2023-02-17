import { useAtom } from "jotai";
import React, { FC, useContext } from "react";
import { View } from "react-native";
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
import {
  PlayerContainer,
  TextWinner,
} from "../match-result-card/match-result-card.styles";

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
      <Card.Content>
        <PlayerContainer>
          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
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
          </View>
          <View style={{ flex: 0.8 }}>
            <Spacer position="bottom" size="medium">
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.2 }}>
                  <CountryFlag size={25} isoCode={homePlayer.countryKey} />
                </View>
                <View style={{ flex: 0.7 }}>
                  {homeId === winnerId ? (
                    <TextWinner variant="body">{homePlayer.name}</TextWinner>
                  ) : (
                    <Text variant="body">{homePlayer.name}</Text>
                  )}
                </View>
                <View style={{ flex: 0.1 }}>
                  {homeId === winnerId ? (
                    <TextWinner variant="body">{homeSets}</TextWinner>
                  ) : (
                    <Text variant="body">{homeSets}</Text>
                  )}
                </View>
              </View>
            </Spacer>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.2 }}>
                <CountryFlag size={25} isoCode={awayPlayer.countryKey} />
              </View>
              <View style={{ flex: 0.7 }}>
                {awayId === winnerId ? (
                  <TextWinner variant="body">{awayPlayer.name}</TextWinner>
                ) : (
                  <Text variant="body">{awayPlayer.name}</Text>
                )}
              </View>
              <View style={{ flex: 0.1 }}>
                {awayId === winnerId ? (
                  <TextWinner variant="body">{awaySets}</TextWinner>
                ) : (
                  <Text variant="body">{awaySets}</Text>
                )}
              </View>
            </View>
          </View>
        </PlayerContainer>
      </Card.Content>
    </Card>
  );
};
