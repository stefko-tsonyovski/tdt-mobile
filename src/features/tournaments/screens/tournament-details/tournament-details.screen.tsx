import React, { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { TournamentDetailCard } from "../../components/tournament-detail-card/tournament-detail-card.component";
import { TournamentDetailMenuTabs } from "../../components/tournament-detail-menu-tabs/tournament-detail-menu-tabs.component";

interface Props
  extends StackScreenProps<
    TournamentsRootStackParamList,
    "TournamentDetails"
  > {}

export const TournamentDetailsScreen: FC<Props> = ({ route, navigation }) => {
  const { tournamentId } = route.params;

  return (
    <SafeArea>
      <TournamentDetailCard tournamentId={tournamentId} />
      <TournamentDetailMenuTabs tournamentId={tournamentId} />
    </SafeArea>
  );
};
