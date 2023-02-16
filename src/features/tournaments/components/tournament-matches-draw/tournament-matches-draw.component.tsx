import React, { FC } from "react";
import { Text } from "../../../../components/typography/text.component";

type TournamentMatchesDrawProps = {
  tournamentId: number;
};

export const TournamentMatchesDraw: FC<TournamentMatchesDrawProps> = ({
  tournamentId,
}) => {
  return (
    <>
      <Text variant="body">MatchDraw</Text>
    </>
  );
};
