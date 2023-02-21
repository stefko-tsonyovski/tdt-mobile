import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useState, useEffect, FC } from "react";
import { View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { UsersRootStackParamList } from "../../../../infrastructure/navigation/users.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { League } from "../../../../services/leagues/leagues.service";
import { fetchLeaguesAtom } from "../../../../utils/atoms";
import { PredictionCardText } from "../voted-prediction-card/voted-prediction-card.styles";

const numberOfItemsPerPageList = [5, 10, 25];

export type LeaguesTableProps = {
  leagues: League[];
};

export const LeaguesTable: FC<LeaguesTableProps> = ({ leagues }) => {
  const navigation = useNavigation<NavigationProp<UsersRootStackParamList>>();

  const [fetchLeagues] = useAtom(fetchLeaguesAtom);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    Number(leagues?.length || 0)
  );

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage, fetchLeagues]);

  return (
    <DataTable>
      <DataTable.Header style={{ backgroundColor: colors.bg.secondary }}>
        <DataTable.Title style={{ flex: 1 }}>
          <PredictionCardText variant="body">#</PredictionCardText>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 2 }}>
          <PredictionCardText variant="body">LEAGUE</PredictionCardText>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>
          <PredictionCardText variant="body">POINTS</PredictionCardText>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>
          <PredictionCardText variant="body">ACTIONS</PredictionCardText>
        </DataTable.Title>
      </DataTable.Header>

      {fetchLeagues ? (
        leagues?.length ? (
          leagues.slice(from, to).map((league) => (
            <DataTable.Row key={league._id}>
              <DataTable.Cell style={{ flex: 1 }}>
                {league.position}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>{league.name}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                {league.points.toFixed(0)}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <IconButton
                  // onPress={() =>
                  //   navigation.navigate("TeamByUser", {
                  //     userId: user._id,
                  //     title: user.firstName + " " + user.lastName,
                  //   })
                  // }
                  icon="eye"
                  color={colors.bg.primary}
                />
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
        numberOfPages={Math.ceil(
          Number(leagues?.length || 0) / numberOfItemsPerPage
        )}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${Number(leagues?.length || 0)}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};
