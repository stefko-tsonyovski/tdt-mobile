import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { useState, useEffect, FC } from "react";
import { View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { UsersRootStackParamList } from "../../../../infrastructure/navigation/users.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { User } from "../../../../services/users/users.service";
import { fetchUsersAtom } from "../../../../utils/atoms";
import { PredictionCardText } from "../voted-prediction-card/voted-prediction-card.styles";

const numberOfItemsPerPageList = [5, 10, 25];

export type UsersTableProps = {
  users: User[];
};

export const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const navigation = useNavigation<NavigationProp<UsersRootStackParamList>>();

  const [fetchUsers] = useAtom(fetchUsersAtom);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, users.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage, fetchUsers]);

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
        <DataTable.Title style={{ flex: 1 }}>
          <PredictionCardText variant="body">VIEW</PredictionCardText>
        </DataTable.Title>
      </DataTable.Header>

      {fetchUsers ? (
        users.length ? (
          users.slice(from, to).map((user) => (
            <DataTable.Row key={user._id}>
              <DataTable.Cell style={{ flex: 1 }}>
                {user.position}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                {user.firstName + " " + user.lastName}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                {user.totalPoints.toFixed(0)}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <IconButton
                  onPress={() =>
                    navigation.navigate("TeamByUser", {
                      userId: user._id,
                      title: user.firstName + " " + user.lastName,
                    })
                  }
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
