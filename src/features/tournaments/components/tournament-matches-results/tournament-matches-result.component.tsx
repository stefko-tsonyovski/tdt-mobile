import React, { FC } from "react";
import { Text } from "../../../../components/typography/text.component";

type TournamentMatchesResults = {
  tournamentId: number;
};

export const TournamentMatchesResults: FC<TournamentMatchesResults> = ({
  tournamentId,
}) => {
  return (
    <>
      <Text variant="body">MatchResults</Text>
    </>
  );
};
