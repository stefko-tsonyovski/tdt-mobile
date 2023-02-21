import React, { FC, useState } from "react";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { TournamentMatchesDraw } from "../tournament-matches-draw/tournament-matches-draw.component";
import { TournamentMatchesResults } from "../tournament-matches-results/tournament-matches-result.component";
import {
  ActiveTab,
  MenuTabsContainer,
  Tab,
  TabsContainer,
  TabPanelContainer,
  TabContentContainer,
} from "./tournament-detail-menu-tabs.styles";

type TournamentDetailMenuTabsProps = {
  tournamentId: number;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabs = ["DRAW", "RESULTS"];

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

export const TournamentDetailMenuTabs: FC<TournamentDetailMenuTabsProps> = ({
  tournamentId,
}) => {
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
        <TournamentMatchesDraw tournamentId={tournamentId} />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <TournamentMatchesResults tournamentId={tournamentId} />
      </TabPanel>
    </TabsContainer>
  );
};
