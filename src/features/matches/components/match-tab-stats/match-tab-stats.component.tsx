import React, { FC } from "react";
import { View } from "react-native";
import { Colors, Divider, ProgressBar } from "react-native-paper";
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
      <Text variant="body">Services</Text>
      <Divider />
      <MatchStatCard statName="Aces" homeStat={homeAces} awayStat={awayAces} />
      <MatchStatCard
        statName="Double Faults"
        homeStat={homeDoubleFaults}
        awayStat={awayDoubleFaults}
      />
      <Text variant="body">Points</Text>
      <Divider />
      <MatchStatCard
        statName="Winners"
        homeStat={homeWinners}
        awayStat={awayWinners}
      />
      <MatchStatCard
        statName="Unforced Errors"
        homeStat={homeUnforcedErrors}
        awayStat={awayUnforcedErrors}
      />
    </>
  );
};
