import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { FC, useContext, useState } from "react";
import { View } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import { Elevation } from "../../../../components/elevation/elevation.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { LeaguesRootStackParamList } from "../../../../infrastructure/navigation/leagues.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  UpdateLeagueInputModel,
  useSingleLeague,
  useUpdatePoints,
} from "../../../../services/leagues/leagues.service";
import { useUnapprovedByLeague } from "../../../../services/requests/requests.service";
import {
  useByLeague,
  User,
  useUserByEmail,
} from "../../../../services/users/users.service";
import { fetchUsersByLeagueAtom } from "../../../../utils/atoms";
import { DeleteLeague } from "../delete-league/delete-league.component";
import { LeaveLeague } from "../leave-league/leave-league.component";
import { SendLeagueInvitation } from "../send-league-invitation/send-league-invitation.component";
import { StatsCircle } from "../stats-circle/stats-circle.component";
import { UpdateLeague } from "../update-league/update-league.component";
import { UsersByLeagueTable } from "../users-by-league-table/users-by-league-table.component";
import {
  InfoBoxContainer,
  InfoBoxContainerText,
} from "../users-ranking-list/users-ranking-list.styles";

export type LeagueDetailsProps = {
  league: UpdateLeagueInputModel;
};

export const LeagueDetails: FC<LeagueDetailsProps> = ({ league }) => {
  const navigation = useNavigation<NavigationProp<LeaguesRootStackParamList>>();

  const { user } = useContext(AuthenticationContext);

  const [fetchUsersByLeague, setFetchUsersByLeague] = useAtom(
    fetchUsersByLeagueAtom
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useUserByEmail(
    user.email
  );

  const { data: requestsData, isLoading: isLoadingRequests } =
    useUnapprovedByLeague(league._id, user.email);

  const { data: usersByLeagueData, isLoading: isLoadingUsersByLeague } =
    useByLeague(
      league._id,
      searchQuery,
      fetchUsersByLeague,
      Number(requestsData?.requests.length)
    );

  const { mutate: updatePoints, isLoading: isLoadingUpdatePoints } =
    useUpdatePoints();

  const onChangeSearch = (query: string) => {
    setFetchUsersByLeague(false);
    setSearchQuery(query);
  };

  const handleUpdateLeaguePoints = () => {
    const inputModel = {
      leagueId: league._id,
      email: user.email,
    };

    updatePoints(inputModel);
  };

  return (
    <>
      {isLoadingUsersByLeague ||
      isLoadingCurrentUser ||
      isLoadingRequests ||
      isLoadingUpdatePoints ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <InfoBoxContainer>
            <InfoBoxContainerText variant="body">
              {league.name}'s Rankings
            </InfoBoxContainerText>
          </InfoBoxContainer>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View>
              <StatsCircle
                color={colors.bg.primary}
                text={`TOTAL POINTS`}
                points={Number(league.points)}
              />
            </View>
            <Spacer position="left" size="xxl">
              <StatsCircle
                color={colors.bg.primary}
                text={`TOTAL MEMBERS`}
                points={Number(usersByLeagueData?.users.length)}
              />
            </Spacer>
          </View>

          {currentUser?._id === league.creatorId && (
            <Spacer position="top" size="large">
              <UpdateLeague inputModel={league as UpdateLeagueInputModel} />
            </Spacer>
          )}

          {currentUser?._id === league.creatorId && (
            <Spacer position="top" size="large">
              <DeleteLeague inputModel={league as UpdateLeagueInputModel} />
            </Spacer>
          )}

          {currentUser?.leagueId === league._id && (
            <Spacer position="top" size="large">
              <LeaveLeague inputModel={league as UpdateLeagueInputModel} />
            </Spacer>
          )}

          {currentUser?._id === league.creatorId && (
            <Spacer position="top" size="large">
              <Button
                onPress={handleUpdateLeaguePoints}
                mode="contained"
                color={colors.bg.primary}
              >
                UPDATE POINTS
              </Button>
            </Spacer>
          )}

          {currentUser?._id === league.creatorId && (
            <Spacer position="top" size="large">
              <SendLeagueInvitation league={league} />
            </Spacer>
          )}

          {currentUser?._id === league.creatorId && (
            <Spacer position="top" size="large">
              <Button
                onPress={() =>
                  navigation.navigate("Requests", {
                    leagueId: league._id,
                    title: league.name,
                  })
                }
                mode="contained"
                color={colors.bg.primary}
              >
                VIEW REQUESTS
              </Button>
            </Spacer>
          )}

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Elevation>
            <Searchbar
              placeholder="Search users..."
              onChangeText={onChangeSearch}
              onSubmitEditing={() => setFetchUsersByLeague(true)}
              onIconPress={() => setFetchUsersByLeague(true)}
              value={searchQuery}
            />
          </Elevation>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <UsersByLeagueTable
            currentUser={currentUser as User}
            users={(usersByLeagueData?.users as User[]) || []}
            league={league as UpdateLeagueInputModel}
          />
        </>
      )}
    </>
  );
};
