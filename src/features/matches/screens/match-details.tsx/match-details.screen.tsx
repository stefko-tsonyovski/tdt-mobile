import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "../../../../components/typography/text.component";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { useSingleMatch } from "../../../../services/matches/matches.service";
import { TournamentMatchHeading } from "../../../tournaments/components/tournament-match-heading/tournament-match-heading.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { PlayersMatchCard } from "../../../players/components/players-match-card/players-match-card.component";
import { MatchMenuTabs } from "../../components/match-menu-tabs/match-menu-tabs.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";

export type MatchDetailsScreenProps = NativeStackScreenProps<
  TournamentsRootStackParamList,
  "MatchDetails"
>;

export const MatchDetailsScreen: FC<MatchDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { matchId } = route.params;

  const { data, isLoading } = useSingleMatch(matchId);

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <SafeArea>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TournamentDetails", {
            tournamentId: data.match.tournamentId,
          })
        }
      >
        <TournamentMatchHeading tournamentId={data?.match.tournamentId} />
      </TouchableOpacity>
      <PlayersMatchCard
        homeId={data.match.homeId}
        homeSets={data.match.homeSets}
        awayId={data.match.awayId}
        awaySets={data.match.awaySets}
        winnerId={data.match.winnerId}
        date={data.match.date}
        status={data.match.status}
      />
      <MatchMenuTabs match={data.match} />
    </SafeArea>
  );
};
