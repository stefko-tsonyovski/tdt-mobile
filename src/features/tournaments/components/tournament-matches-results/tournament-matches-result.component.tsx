import React, { FC, useCallback } from "react";
import {
  MatchDrawViewModel,
  MatchesByRoundViewModel,
  useMatchesByTournamentGroupByRound,
} from "../../../../services/matches/matches.service";
import { Text } from "../../../../components/typography/text.component";
import { MatchResultCard } from "../../../matches/match-result-card/match-result-card.component";
import { FlatList } from "react-native-gesture-handler";

type TournamentMatchesResults = {
  tournamentId: number;
};

export const TournamentMatchesResults: FC<TournamentMatchesResults> = ({
  tournamentId,
}) => {
  const { data, isLoading } = useMatchesByTournamentGroupByRound(tournamentId);

  const renderItemMatches = useCallback(
    ({ item }: { item: MatchDrawViewModel }) => (
      <MatchResultCard match={item} />
    ),
    [data]
  );

  const keyExtractorMatches = useCallback(
    (item: MatchDrawViewModel, index: number) =>
      item.id.toString() + index.toString(),
    [data]
  );

  const renderItem = useCallback(
    ({ item }: { item: MatchesByRoundViewModel }) => {
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
    },
    []
  );

  const keyExtractor = useCallback(
    (item: MatchesByRoundViewModel, index: number) => item.round?.name + index,
    [data]
  );

  return (
    <>
      {!isLoading && data ? (
        <FlatList
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          data={data.groupedMatches}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
