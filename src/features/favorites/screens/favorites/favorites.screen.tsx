import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FC, useContext } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import CountryFlag from "react-native-country-flag";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Card, Colors } from "react-native-paper";
import { Banner } from "../../../../components/banner/banner.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { TabParamList } from "../../../../infrastructure/navigation/app.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  TournamentsByDate,
  useFavoriteMatchesByUser,
} from "../../../../services/favorites/favorites.service";
import {
  MatchCardViewModel,
  MatchesByTournament,
} from "../../../../services/matches/matches.service";
import { MatchCard } from "../../../matches/components/match-card/match-card.component";
import { DetailCard } from "../../../tournaments/components/tournament-detail-card/tournament-detail-card.styles";

export const FavoritesScreen = () => {
  const navigation = useNavigation<NavigationProp<TabParamList>>();

  const { user } = useContext(AuthenticationContext);
  const { data, isLoading } = useFavoriteMatchesByUser(user?.email);

  const renderItemMatch = ({ item }: { item: MatchCardViewModel }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tournaments", {
            screen: "MatchDetails",
            params: { matchId: item.id },
          })
        }
      >
        <MatchCard match={item} />
      </TouchableOpacity>
    );
  };

  const keyExtractorMatch = (item: MatchCardViewModel) => item.id.toString();

  const renderItemTournament = ({ item }: { item: MatchesByTournament }) => {
    const { tournament, matches } = item;

    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tournaments", {
              screen: "TournamentDetails",
              params: { tournamentId: tournament.id },
            })
          }
        >
          <DetailCard>
            <Card.Title
              leftStyle={{ marginRight: 10 }}
              left={(props) => (
                <CountryFlag
                  {...props}
                  size={25}
                  isoCode={tournament?.countryKey}
                />
              )}
              title={
                <>
                  <Text
                    variant="caption"
                    style={{
                      color: Colors.grey700,
                      textTransform: "uppercase",
                    }}
                  >
                    {tournament.countryName}:{" "}
                  </Text>
                  <Text
                    variant="caption"
                    style={{ textTransform: "uppercase" }}
                  >
                    {tournament.name}
                  </Text>
                </>
              }
            />
          </DetailCard>
        </TouchableOpacity>
        <FlatList
          listKey={tournament.id.toString()}
          data={matches}
          renderItem={renderItemMatch}
          keyExtractor={keyExtractorMatch}
        />
      </>
    );
  };

  const keyExtractorTournaments = (item: MatchesByTournament) =>
    item.tournament.id.toString();

  const renderItem = ({ item }: { item: TournamentsByDate }) => {
    const { date, tournaments } = item;

    return (
      <Spacer position="bottom" size="large">
        <>
          <Spacer position="left" size="large">
            <Text style={{ fontWeight: "bold" }}>{date}</Text>
          </Spacer>
          <Spacer position="bottom" size="medium">
            <></>
          </Spacer>
          <FlatList
            listKey={date}
            data={tournaments}
            renderItem={renderItemTournament}
            keyExtractor={keyExtractorTournaments}
          />
        </>
      </Spacer>
    );
  };

  const keyExtractor = (item: TournamentsByDate, index: number) =>
    item.date + index;

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while"
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  const { matchesByDate } = data;
  return (
    <SafeArea>
      <Spacer position="top" size="xl">
        <FlatList
          data={matchesByDate}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Spacer>
      <Banner />
    </SafeArea>
  );
};
