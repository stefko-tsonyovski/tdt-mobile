import { useAtom } from "jotai";
import React, { FC, useCallback, useRef } from "react";
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import {
  Match,
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
    <>
      {!isLoading && data ? (
        data?.matches?.length ? (
          <FlatList
            ListHeaderComponent={<MatchesRoundFilter />}
            data={data.matches}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={8}
            renderItem={renderItem}
          />
        ) : (
          <>
            <Divider />
            <Text variant="body">No Matches</Text>
            <Divider />
          </>
        )
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
