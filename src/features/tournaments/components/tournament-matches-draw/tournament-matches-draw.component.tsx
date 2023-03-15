import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { FC } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { NoData } from "../../../../components/no-data/no-data.component";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
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
  const navigation =
    useNavigation<NavigationProp<TournamentsRootStackParamList>>();
  const [round] = useAtom(selectedRoundId);
  const { data, isLoading } = useMatchesByTournamentAndRound(
    tournamentId,
    round
  );

  const renderItem = ({ item }: { item: MatchCardViewModel }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MatchDetails", { matchId: item.id })}
    >
      <MatchResultCard match={item} />
    </TouchableOpacity>
  );

  const keyExtractor = (item: MatchCardViewModel) => item.id.toString();

  return (
    <>
      {(isLoading || !data) && (
        <Spinner
          visible={true}
          textContent="This may take a while..."
          textStyle={{ color: colors.text.inverse }}
        />
      )}
      <FlatList
        ListHeaderComponent={<MatchesRoundFilter />}
        data={isLoading || !data ? [] : data.matches}
        ListFooterComponent={
          data && data.matches.length === 0 ? (
            <NoData message="No Matches" />
          ) : (
            <></>
          )
        }
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={8}
        renderItem={renderItem}
      />
    </>
  );
};
