import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { TournamentsList } from "../components/tournaments-list/tournaments-list.component";

const TournamentsScreen = () => {
  return (
    <SafeArea>
      <TournamentsList />
    </SafeArea>
  );
};

export default TournamentsScreen;
