import { useAtom } from "jotai";
import React, { FC, useCallback } from "react";
import { VirtualizedList } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import {
  Match,
  useMatchesByTournamentAndRound,
} from "../../../../services/matches/matches.service";
import { selectedRoundId } from "../../../../utils/atoms";
import { MatchResultCard } from "../../../matches/match-result-card/match-result-card.component";

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
    ({ item }: { item: Match }) => <MatchResultCard match={item} />,
    [data]
  );

  const keyExtractor = useCallback((item: Match) => item.id.toString(), []);

  return (
    <>
      {!isLoading && data ? (
        data?.matches?.length ? (
          <FlatList
            data={data.matches}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={9}
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
