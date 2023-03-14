import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import { Elevation } from "../../../../components/elevation/elevation.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { LeaguesRootStackParamList } from "../../../../infrastructure/navigation/leagues.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useByReceiver } from "../../../../services/league-invitations/league-invitations.service";
import {
  League,
  useTop200,
} from "../../../../services/leagues/leagues.service";
import { useCurrentUserPosition } from "../../../../services/users/users.service";
import { fetchLeaguesAtom } from "../../../../utils/atoms";
import { CreateLeague } from "../create-league/create-league.component";
import { LeaguesTable } from "../leagues-table/leagues-table.component";
import {
  InfoBoxContainer,
  InfoBoxContainerText,
} from "../users-ranking-list/users-ranking-list.styles";
import Spinner from "react-native-loading-spinner-overlay";

export const LeaguesRankingList = () => {
  const navigation = useNavigation<NavigationProp<LeaguesRootStackParamList>>();

  const { user } = useContext(AuthenticationContext);

  const [fetchLeagues, setFetchLeagues] = useAtom(fetchLeaguesAtom);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: leagueInvitationsData, isLoading: isLoadingLeagueInvitations } =
    useByReceiver(user.email);

  const { data: currentUserData } = useCurrentUserPosition(
    user.email,
    Number(leagueInvitationsData?.leagueInvitations.length)
  );

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
      {isLoadingLeagues || isLoadingLeagueInvitations ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
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

          <CreateLeague />

          {currentUserData?.leagueId && (
            <Spacer position="top" size="large">
              <Button
                onPress={() =>
                  navigation.navigate("LeagueDetails", {
                    leagueId: currentUserData?.leagueId as string,
                    title: "Your League",
                  })
                }
                mode="contained"
                color={colors.bg.primary}
              >
                YOUR LEAGUE
              </Button>
            </Spacer>
          )}

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Button
            onPress={() => navigation.navigate("LeagueInvitations")}
            mode="contained"
            color={colors.bg.primary}
          >
            INVITATIONS ({leagueInvitationsData?.leagueInvitations?.length || 0}
            )
          </Button>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <LeaguesTable leagues={leaguesData?.leagues as League[]} />
        </>
      )}
    </>
  );
};
