import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Elevation } from "../../../../components/elevation/elevation.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  useCurrentUserPosition,
  User,
  useTop200,
} from "../../../../services/users/users.service";
import { UsersTable } from "../users-table/users-table.component";

export const UsersRankingList = () => {
  const { user } = useContext(AuthenticationContext);

  const { data: usersData, isLoading: isLoadingUsers } = useTop200();
  const { data: currentUserData } = useCurrentUserPosition(user.email);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <>
      {isLoadingUsers ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.bg.primary,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ color: colors.text.inverse, fontSize: 20 }}
              variant="body"
            >
              USERS RANKINGS
            </Text>
            <Spacer position="top" size="medium">
              <View></View>
            </Spacer>
            <Text
              style={{ color: colors.text.inverse, fontSize: 20 }}
              variant="body"
            >
              YOUR POSITION: #{currentUserData?.position}
            </Text>
          </View>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Elevation>
            <Searchbar
              placeholder="Search users..."
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </Elevation>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <UsersTable users={usersData?.users as User[]} />
        </>
      )}
    </>
  );
};
