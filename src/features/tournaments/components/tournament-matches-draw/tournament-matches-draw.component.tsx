import { useAtom } from "jotai";
import React, { FC, useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { NoData } from "../../../../components/no-data/no-data.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import {
  MatchCardViewModel,
  useMatchesByTournamentAndRound,
} from "../../../../services/matches/matches.service";
import { selectedRoundId } from "../../../../utils/atoms";
import { MatchResultCard } from "../../../matches/components/match-result-card/match-result-card.component";
import { MatchesRoundFilter } from "../../../matches/components/matches-round-filter/matches-round-filter.component";

type TournamentMatchesDrawProps = {
  tournamentId: number;
};

export const TournamentMatchesDraw: FC<TournamentMatchesDrawProps> = ({
  tournamentId,
}) => {
  const [round] = useAtom(selectedRoundId);
  const { data, isLoading } = useMatchesByTournamentAndRound(
    tournamentId,
    round
  );

  const renderItem = useCallback(
    ({ item }: { item: MatchCardViewModel }) => (
      <MatchResultCard match={item} />
    ),
    [data]
  );

  const keyExtractor = useCallback(
    (item: MatchCardViewModel) => item.id.toString(),
    [data]
  );

  return (
    <FlatList
      ListHeaderComponent={<MatchesRoundFilter />}
      data={isLoading || !data ? [] : data.matches}
      ListFooterComponent={
        isLoading || !data ? (
          <Spacer position="top" size="large">
            <Text variant="body" textAlign="center">
              Loading...
            </Text>
          </Spacer>
        ) : data.matches.length === 0 ? (
          <NoData message="No Matches" />
        ) : (
          <></>
        )
      }
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={8}
      renderItem={renderItem}
    />
  );
};
