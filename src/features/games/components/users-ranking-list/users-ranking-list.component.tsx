import { useAtom } from "jotai";
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
import { fetchUsersAtom } from "../../../../utils/atoms";
import { UsersTable } from "../users-table/users-table.component";
import {
  InfoBoxContainer,
  InfoBoxContainerText,
} from "./users-ranking-list.styles";
import Spinner from "react-native-loading-spinner-overlay";

export const UsersRankingList = () => {
  const { user } = useContext(AuthenticationContext);

  const [fetchUsers, setFetchUsers] = useAtom(fetchUsersAtom);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: usersData, isLoading: isLoadingUsers } = useTop200(
    searchQuery,
    fetchUsers
  );
  const { data: currentUserData } = useCurrentUserPosition(user.email, -1);

  const onChangeSearch = (query: string) => {
    setFetchUsers(false);
    setSearchQuery(query);
  };

  return (
    <>
      {isLoadingUsers ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <InfoBoxContainer>
            <InfoBoxContainerText variant="body">
              USERS RANKINGS
            </InfoBoxContainerText>
            <Spacer position="top" size="medium">
              <View></View>
            </Spacer>
            <InfoBoxContainerText variant="body">
              YOUR POSITION: #{currentUserData?.position}
            </InfoBoxContainerText>
          </InfoBoxContainer>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Elevation>
            <Searchbar
              placeholder="Search users..."
              onChangeText={onChangeSearch}
              onSubmitEditing={() => setFetchUsers(true)}
              onIconPress={() => setFetchUsers(true)}
              value={searchQuery}
            />
          </Elevation>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <UsersTable users={(usersData?.users as User[]) || []} />
        </>
      )}
    </>
  );
};
