import React, { FC } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import {
  MatchCardViewModel,
  MatchesByTournament,
  useMatchesByPlayerGroupByTournament,
} from "../../../../services/matches/matches.service";
import { TournamentItemDetailCard } from "../../../tournaments/components/tournament-item-detail-card/tournament-item-detail-card.component";
import { NoData } from "../../../../components/no-data/no-data.component";
import { LastMatchCard } from "../../../matches/components/last-match-card/last-match-card.component";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";

type PlayerResultsProps = {
  playerId: number;
};

export const PlayerResults: FC<PlayerResultsProps> = ({ playerId }) => {
  const navigation =
    useNavigation<NavigationProp<TournamentsRootStackParamList>>();
  const { data, isLoading } = useMatchesByPlayerGroupByTournament(playerId);

  const renderItemLastMatch = ({ item }: { item: MatchCardViewModel }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MatchDetails", { matchId: item.id })
        }
      >
        <LastMatchCard match={item} playerId={playerId} />
      </TouchableOpacity>
    );
  };

  const keyExtractorLastMatch = (item: MatchCardViewModel) =>
    item.id.toString();

  const renderItem = ({ item }: { item: MatchesByTournament }) => {
    const { tournament, matches } = item;

    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TournamentDetails", {
              tournamentId: tournament.id,
            })
          }
        >
          <TournamentItemDetailCard tournament={tournament} />
        </TouchableOpacity>
        <FlatList
          data={matches}
          renderItem={renderItemLastMatch}
          keyExtractor={keyExtractorLastMatch}
        />
      </>
    );
  };

  const keyExtractor = (item: MatchesByTournament) =>
    item.tournament.id.toString();

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <>
      {data.groupedMatches && data.groupedMatches.length > 0 ? (
        <FlatList
          data={data?.groupedMatches}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <NoData message="No Results" />
      )}
    </>
  );
};
