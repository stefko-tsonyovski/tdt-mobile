import React from "react";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { TournamentsList } from "../../components/tournaments-list/tournaments-list.component";
import { TournamentsFilter } from "../../components/tournaments-filter/tournaments-filter.component";
import { Spacer } from "../../../../components/spacer/spacer.component";

export const TournamentsScreen = () => {
  return (
    <>
      <Spacer position="bottom" size="large">
        <TournamentsFilter />
      </Spacer>
      <TournamentsList />
    </>
  );
};
