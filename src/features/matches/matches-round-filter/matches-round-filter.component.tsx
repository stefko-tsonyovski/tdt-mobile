import React, { useCallback } from "react";
import { Chip } from "react-native-paper";
import { useAtom } from "jotai";
import { selectedRoundId } from "../../../utils/atoms";
import { Round, useAllRounds } from "../../../services/rounds/rounds.service";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import { RoundsList } from "../../games/components/rounds-list/rounds-list.component";

export const MatchesRoundFilter = () => {
  const [round, setRound] = useAtom(selectedRoundId);
  const { data, isLoading } = useAllRounds();

  return (
    <>
      {!isLoading && data ? (
        <RoundsList rounds={data?.rounds} />
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
