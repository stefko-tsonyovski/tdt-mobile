import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useState, useEffect, FC } from "react";
import { View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { LeaguesRootStackParamList } from "../../../../infrastructure/navigation/leagues.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { League } from "../../../../services/leagues/leagues.service";
import { fetchLeaguesAtom } from "../../../../utils/atoms";
import { CreateRequest } from "../create-request/create-request.component";
import { PredictionCardText } from "../voted-prediction-card/voted-prediction-card.styles";

const numberOfItemsPerPageList = [5, 10, 25];

export type LeaguesTableProps = {
  leagues: League[];
};

export const LeaguesTable: FC<LeaguesTableProps> = ({ leagues }) => {
  const navigation = useNavigation<NavigationProp<LeaguesRootStackParamList>>();

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
        <DataTable.Title style={{ flex: 2 }}>
          <PredictionCardText variant="body">ACTIONS</PredictionCardText>
        </DataTable.Title>
      </DataTable.Header>

      {fetchLeagues ? (
        leagues?.length ? (
          leagues.slice(from, to).map((league) => (
            <DataTable.Row key={league._id}>
              <DataTable.Cell style={{ flex: 1 }}>
                <Text variant="body">{league.position}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <Text variant="body">{league.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <Text variant="body">{league.points.toFixed(0)}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <IconButton
                    onPress={() =>
                      navigation.navigate("LeagueDetails", {
                        leagueId: league._id,
                        title: league.name,
                      })
                    }
                    icon="eye"
                    color={colors.ui.secondary}
                  />
                  <CreateRequest league={league} />
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
