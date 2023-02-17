import React, { useState, useEffect, FC } from "react";
import { DataTable, IconButton } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { User } from "../../../../services/users/users.service";

const optionsPerPage = [2, 3, 4];

export type UsersTableProps = {
  users: User[];
};

export const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title numeric>
          <Text style={{ textAlign: "left" }} variant="body">
            #
          </Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text variant="body">USER</Text>
        </DataTable.Title>
        <DataTable.Title numeric>
          <Text variant="body">POINTS</Text>
        </DataTable.Title>
        <DataTable.Title>
          <Text variant="body">VIEW</Text>
        </DataTable.Title>
      </DataTable.Header>

      {users.map((user) => (
        <DataTable.Row key={user._id}>
          <DataTable.Cell numeric>{user.position}</DataTable.Cell>
          <DataTable.Cell>
            {user.firstName + " " + user.lastName}
          </DataTable.Cell>
          <DataTable.Cell numeric>{user.totalPoints.toFixed(0)}</DataTable.Cell>
          <DataTable.Cell>
            <IconButton icon="eye" />
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};
