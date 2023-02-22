import React, { FC } from "react";
import { Text } from "../../../../components/typography/text.component";
import {
  HeadToHeadMatchViewModel,
  MatchCardViewModel,
  useLastMatchesByPlayer,
} from "../../../../services/matches/matches.service";
import { MatchCard } from "../match-card/match-card.component";

type LastMatchesListProps = {
  matchId: number;
  playerId: number;
};

const listComponent = (list?: HeadToHeadMatchViewModel[], playerId?: number) =>
  list?.map((m) => {
    return (
      <MatchCard match={m as unknown as MatchCardViewModel} />
      //   <LastMatchCard
      //     key={m.id}
      //     matchId={m.id}
      //     date={m.date}
      //     homePlayer={m.homePlayer}
      //     awayPlayer={m.awayPlayer}
      //     homeSets={m.homeSets}
      //     awaySets={m.awaySets}
      //     winnerId={m.winnerId}
      //     playerId={playerId}
      //     favoriteId={m.favoriteId}
      //     status={m.status}
      //   />
    );
  });

export const LastMatchesList: FC<LastMatchesListProps> = ({
  matchId,
  playerId,
}) => {
  const { data, isLoading } = useLastMatchesByPlayer({
    skipMatchId: matchId,
    playerId: playerId,
    surface: "Outdoor Hard",
  });
  return !isLoading && data ? (
    <>
      <Text variant="body">Last matches: {data.player?.name}</Text>
      {listComponent(data.matches, playerId)}
    </>
  ) : (
    <Text variant="body">Loading...</Text>
  );
};
