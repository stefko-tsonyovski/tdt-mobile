import React, { FC } from "react";
import { useAtom } from "jotai";
import { Text } from "../../../../components/typography/text.component";
import { useLastMatchesByPlayer } from "../../../../services/matches/matches.service";
import { LastMatchesList } from "../last-matches-list/last-matches-list.component";

type MatchHeadToHeadProps = {
  id: number;
  homeId: number;
  awayId: number;
};

export const MatchTabHeadToHead: FC<MatchHeadToHeadProps> = ({
  id,
  homeId,
  awayId,
}) => {
  return (
    <>
      <LastMatchesList matchId={id} playerId={homeId} />
      <LastMatchesList matchId={id} playerId={awayId} />
    </>
  );
};
