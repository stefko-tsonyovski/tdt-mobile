import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { TournamentDetailCard } from "../../components/tournament-detail-card/tournament-detail-card.component";
import { TournamentItemCard } from "../../components/tournament-item-card/tournament-item-card.component";
import { useMatchesByTournamentAndDate } from "../../../../services/matches/matches.service";
import { MatchesList } from "../../../matches/components/matches-list/matches-list.component";
import { TouchableOpacity } from "react-native-gesture-handler";

export type TournamentsScreenProps = NativeStackScreenProps<
  TournamentsRootStackParamList,
  "SingleTournamentMatches"
>;

export const SingleTournamentMatchesScreen: FC<TournamentsScreenProps> = ({
  route,
  navigation,
}) => {
  const { tournamentId, date } = route.params;

  return (
    <>
      <TournamentDetailCard tournamentId={tournamentId} />
      <MatchesList tournamentId={tournamentId} date={date} />
    </>
  );
};
