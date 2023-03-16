import React, { FC } from "react";
import { View } from "react-native";
import { Colors, Divider, ProgressBar } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { MatchStatsViewModel } from "../../../../services/matches/matches.service";
import { MatchStatCard } from "../match-stat-card/match-stat-card.component";

type MatchTabStatsProps = {
  stats: MatchStatsViewModel;
};

export const MatchTabStats: FC<MatchTabStatsProps> = ({ stats }) => {
  const {
    homeAces,
    homeDoubleFaults,
    homeWinners,
    homeUnforcedErrors,
    awayAces,
    awayDoubleFaults,
    awayWinners,
    awayUnforcedErrors,
  } = stats;

  return (
    <>
      <Text style={{ fontWeight: "bold", fontSize: 18 }} variant="body">
        Services
      </Text>
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <Divider style={{ height: 3 }} />
      <MatchStatCard statName="Aces" homeStat={homeAces} awayStat={awayAces} />
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <MatchStatCard
        statName="Double Faults"
        homeStat={homeDoubleFaults}
        awayStat={awayDoubleFaults}
      />
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <Text style={{ fontWeight: "bold", fontSize: 18 }} variant="body">
        Points
      </Text>
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <Divider style={{ height: 3 }} />
      <MatchStatCard
        statName="Winners"
        homeStat={homeWinners}
        awayStat={awayWinners}
      />
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <MatchStatCard
        statName="Unforced Errors"
        homeStat={homeUnforcedErrors}
        awayStat={awayUnforcedErrors}
      />
    </>
  );
};
