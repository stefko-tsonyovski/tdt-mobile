import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "../../../../components/typography/text.component";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { useSingleMatch } from "../../../../services/matches/matches.service";
import { TournamentMatchHeading } from "../../../tournaments/components/tournament-match-heading/tournament-match-heading.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { PlayersMatchCard } from "../../../players/components/players-match-card/players-match-card.component";

export type MatchDetailsScreenProps = NativeStackScreenProps<
  TournamentsRootStackParamList,
  "MatchDetails"
>;

export const MatchDetailsScreen: FC<MatchDetailsScreenProps> = ({ route }) => {
  const { matchId } = route.params;

  const { data, isLoading } = useSingleMatch(matchId);

  return (
    <SafeArea>
      {!isLoading && data ? (
        <>
          <TournamentMatchHeading tournamentId={data?.match.tournamentId} />
          <PlayersMatchCard
            homeId={data.match.homeId}
            homeSets={data.match.homeSets}
            awayId={data.match.awayId}
            awaySets={data.match.awaySets}
            date={data.match.date}
            status={data.match.status}
          />
        </>
      ) : (
        <>
          <Text variant="body">Loading...</Text>
        </>
      )}
    </SafeArea>
  );
};
