import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useState, useEffect, FC } from "react";
import { View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { UsersRootStackParamList } from "../../../../infrastructure/navigation/users.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { UpdateLeagueInputModel } from "../../../../services/leagues/leagues.service";
import { User } from "../../../../services/users/users.service";
import { fetchUsersByLeagueAtom } from "../../../../utils/atoms";
import { KickMember } from "../kick-member/kick-member.component";
import { PredictionCardText } from "../voted-prediction-card/voted-prediction-card.styles";

const numberOfItemsPerPageList = [5, 10, 25];

export type UsersByLeagueTableProps = {
  users: User[];
  currentUser: User;
  league: UpdateLeagueInputModel;
};

export const UsersByLeagueTable: FC<UsersByLeagueTableProps> = ({
  users,
  currentUser,
  league,
}) => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();

  const [fetchUsersByLeague] = useAtom(fetchUsersByLeagueAtom);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, users.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage, fetchUsersByLeague]);

  return (
    <DataTable>
      <DataTable.Header style={{ backgroundColor: colors.bg.secondary }}>
        <DataTable.Title style={{ flex: 1 }}>
          <PredictionCardText variant="body">#</PredictionCardText>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>
          <PredictionCardText variant="body">USER</PredictionCardText>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>
          <PredictionCardText variant="body">POINTS</PredictionCardText>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>
          <PredictionCardText variant="body">VIEW</PredictionCardText>
        </DataTable.Title>
      </DataTable.Header>

      {fetchUsersByLeague ? (
        users.length ? (
          users.slice(from, to).map((user) => (
            <DataTable.Row key={user._id}>
              <DataTable.Cell style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text variant="body">{user.position}</Text>
                  {user._id === league.creatorId && (
                    <IconButton color={colors.bg.primary} icon="crown" />
                  )}
                </View>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <Text variant="body">
                  {user.firstName + " " + user.lastName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <Text variant="body">{user.totalPoints.toFixed(0)}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onPress={() =>
                      navigation.navigate("Users", {
                        screen: "TeamByUser",
                        params: {
                          userId: user._id,
                          title: user.firstName + " " + user.lastName,
                        },
                      })
                    }
                    icon="eye"
                    color={colors.ui.secondary}
                  />

                  {currentUser._id === league.creatorId &&
                    currentUser._id !== user._id && (
                      <KickMember member={user} leagueId={league._id} />
                    )}
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Spacer position="top" size="large">
            <Text
              style={{ color: colors.bg.primary, textAlign: "center" }}
              variant="body"
            >
              NO RESULTS!
            </Text>
          </Spacer>
        )
      ) : (
        <Spacer position="top" size="large">
          <Text
            style={{ color: colors.bg.primary, textAlign: "center" }}
            variant="body"
          >
            CLICK THE SEARCH ICON FOR RESULTS...
          </Text>
        </Spacer>
      )}

      <Spacer position="top" size="large">
        <View></View>
      </Spacer>

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(users.length / numberOfItemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${users.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};
