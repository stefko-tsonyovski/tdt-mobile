import { useAtom } from "jotai";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Elevation } from "../../../../components/elevation/elevation.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  League,
  useTop200,
} from "../../../../services/leagues/leagues.service";
import { useCurrentUserPosition } from "../../../../services/users/users.service";
import { fetchLeaguesAtom } from "../../../../utils/atoms";
import { LeaguesTable } from "../leagues-table/leagues-table.component";
import {
  InfoBoxContainer,
  InfoBoxContainerText,
} from "../users-ranking-list/users-ranking-list.styles";

export const LeaguesRankingList = () => {
  const { user } = useContext(AuthenticationContext);

  const [fetchLeagues, setFetchLeagues] = useAtom(fetchLeaguesAtom);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: currentUserData } = useCurrentUserPosition(user.email);
  const { data: leaguesData, isLoading: isLoadingLeagues } = useTop200(
    searchQuery,
    fetchLeagues
  );

  const onChangeSearch = (query: string) => {
    setFetchLeagues(false);
    setSearchQuery(query);
  };

  return (
    <>
      <InfoBoxContainer>
        <InfoBoxContainerText variant="body">
          LEAGUES RANKINGS
        </InfoBoxContainerText>
        <Spacer position="top" size="medium">
          <View></View>
        </Spacer>
        <InfoBoxContainerText variant="body">
          YOUR LEAGUE POSITION:{" "}
          {currentUserData?.leaguePosition
            ? `#${currentUserData.leaguePosition}`
            : "No league"}
        </InfoBoxContainerText>
      </InfoBoxContainer>

      <Spacer position="top" size="large">
        <View></View>
      </Spacer>

      <Elevation>
        <Searchbar
          placeholder="Search leagues..."
          onChangeText={onChangeSearch}
          onSubmitEditing={() => setFetchLeagues(true)}
          onIconPress={() => setFetchLeagues(true)}
          value={searchQuery}
        />
      </Elevation>

      <Spacer position="top" size="large">
        <View></View>
      </Spacer>

      <LeaguesTable leagues={leaguesData?.leagues as League[]} />
    </>
  );
};
