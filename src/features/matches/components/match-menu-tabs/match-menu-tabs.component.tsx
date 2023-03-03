import React, { FC, ReactNode, useState } from "react";
import { Pressable } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import {
  ActiveTab,
  MenuTabsContainer,
  Tab,
  TabsContainer,
  TabPanelContainer,
  TabContentContainer,
} from "../../../../components/menu-tabs/menu-tabs.styles";
import { MatchTabSummary } from "../match-tab-summary/match-tab-summary.component";
import { Match } from "../../../../services/matches/matches.service";
import { MatchTabStats } from "../match-tab-stats/match-tab-stats.component";
import { MatchTabHeadToHead } from "../match-tab-head-to-head/match-tab-head-to-head.component";
import { TournamentMatchesDraw } from "../../../tournaments/components/tournament-matches-draw/tournament-matches-draw.component";

type MatchMenuTabsProps = {
  match: Match;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabs = ["SUMMARY", "STATS", "H2H", "DRAW"];

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return value === index ? (
    <TabPanelContainer>
      {value === index && (
        <TabContentContainer {...other}>{children}</TabContentContainer>
      )}
    </TabPanelContainer>
  ) : (
    <></>
  );
};

export const MatchMenuTabs: FC<MatchMenuTabsProps> = ({ match }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handlePressTab = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <TabsContainer>
      <MenuTabsContainer>
        {tabs.map((tab, index) => (
          <Spacer key={tab + index} position="right" size="medium">
            <Pressable onPress={() => handlePressTab(index)}>
              {index === currentTab ? (
                <ActiveTab>
                  <Text variant="body">{tab}</Text>
                </ActiveTab>
              ) : (
                <Tab>
                  <Text variant="body">{tab}</Text>
                </Tab>
              )}
            </Pressable>
          </Spacer>
        ))}
      </MenuTabsContainer>
      <TabPanel value={currentTab} index={0}>
        <MatchTabSummary summary={match} />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <MatchTabStats stats={match} />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <MatchTabHeadToHead
          id={match.id}
          homeId={match.homeId}
          awayId={match.awayId}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <TournamentMatchesDraw tournamentId={match.tournamentId} />
      </TabPanel>
    </TabsContainer>
  );
};
