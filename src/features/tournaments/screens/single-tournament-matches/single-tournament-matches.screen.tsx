import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { TournamentDetailCard } from "../../components/tournament-detail-card/tournament-detail-card.component";
import { MatchesList } from "../../../matches/components/matches-list/matches-list.component";
import { Banner } from "../../../../components/banner/banner.component";

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
      <Banner />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TournamentDetails", { tournamentId })
        }
      >
        <TournamentDetailCard tournamentId={tournamentId} />
      </TouchableOpacity>
      <MatchesList tournamentId={tournamentId} date={date} />
    </>
  );
};
