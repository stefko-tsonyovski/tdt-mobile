import React, { FC } from "react";
import {
  MatchCardViewModel,
  MatchesByRoundViewModel,
  useMatchesByTournamentGroupByRound,
} from "../../../../services/matches/matches.service";
import { Text } from "../../../../components/typography/text.component";
import { MatchResultCard } from "../../../matches/components/match-result-card/match-result-card.component";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";
import { FlatList, TouchableOpacity } from "react-native";
import { NoData } from "../../../../components/no-data/no-data.component";

type TournamentMatchesResults = {
  tournamentId: number;
};

export const TournamentMatchesResults: FC<TournamentMatchesResults> = ({
  tournamentId,
}) => {
  const navigation =
    useNavigation<NavigationProp<TournamentsRootStackParamList>>();
  const { data, isLoading } = useMatchesByTournamentGroupByRound(tournamentId);

  const renderItemMatches = ({ item }: { item: MatchCardViewModel }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MatchDetails", { matchId: item.id })}
    >
      <MatchResultCard match={item} />
    </TouchableOpacity>
  );

  const keyExtractorMatches = (item: MatchCardViewModel, index: number) =>
    item.id.toString() + index.toString();

  const renderItem = ({ item }: { item: MatchesByRoundViewModel }) => {
    return (
      <>
        <Text variant="body" style={{ textTransform: "uppercase" }}>
          {item.round?.name}
        </Text>
        <FlatList
          listKey={item.round?.name}
          initialNumToRender={8}
          maxToRenderPerBatch={16}
          data={item.matches}
          keyExtractor={keyExtractorMatches}
          renderItem={renderItemMatches}
        />
      </>
    );
  };

  const keyExtractor = (item: MatchesByRoundViewModel, index: number) =>
    item.round?.name + index;

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
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          data={data.groupedMatches}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <NoData message="No Results" />
      )}
    </>
  );
};
