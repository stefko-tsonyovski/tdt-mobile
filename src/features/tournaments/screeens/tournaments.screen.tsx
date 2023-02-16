import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { TournamentsList } from "../components/tournaments-list/tournaments-list.component";
import { TournamentsFilter } from "../components/tournaments-filter/tournaments-filter.component";

const TournamentsScreen = () => {
  return (
    <SafeArea>
      <TournamentsFilter />
      <TournamentsList />
    </SafeArea>
  );
};

export default TournamentsScreen;
