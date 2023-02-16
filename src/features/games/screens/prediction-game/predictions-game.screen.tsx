import { Text } from "../../../../components/typography/text.component";
import React, { FC, useContext } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useUserByEmail } from "../../../../services/users/users.service";
import { PredictionsToolbar } from "../../components/predictions-toolbar/predictions-toolbar.component";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { HorizontalDivider } from "../../../../components/horizontal-divider/horizontal-divider.styles";
import { PredictionsList } from "../../components/predictions-list/predictions-list.component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PredictionsGameRootStackParamList } from "../../../../infrastructure/navigation/predictions-game.navigator";

export type PredictionsGameScreenProps = NativeStackScreenProps<
  PredictionsGameRootStackParamList,
  "PredictionsMain"
>;

export const PredictionsGameScreen: FC<PredictionsGameScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = useContext(AuthenticationContext);
  const { data: usersData, isLoading: isLoadingUsers } = useUserByEmail(
    user.email
  );

  return (
    <FantasyGameScreenContainer>
      {isLoadingUsers ? (
        <Text variant="body">Loading...</Text>
      ) : usersData?.role === "user" ? (
        <>
          <PredictionsToolbar navigation={navigation} route={route} />

          <Spacer position="top" size="large">
            <HorizontalDivider />
          </Spacer>

          <Spacer position="top" size="large">
            <PredictionsList />
          </Spacer>
        </>
      ) : (
        <Text variant="body">Admin</Text>
      )}
    </FantasyGameScreenContainer>
  );
};
