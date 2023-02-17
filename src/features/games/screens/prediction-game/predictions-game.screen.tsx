import { Text } from "../../../../components/typography/text.component";
import React, { FC, useContext, useState } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useUserByEmail } from "../../../../services/users/users.service";
import { PredictionsToolbar } from "../../components/predictions-toolbar/predictions-toolbar.component";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { HorizontalDivider } from "../../../../components/horizontal-divider/horizontal-divider.styles";
import { PredictionsList } from "../../components/predictions-list/predictions-list.component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PredictionsGameRootStackParamList } from "../../../../infrastructure/navigation/predictions-game.navigator";
import { UnapprovedPredictionsList } from "../../components/unapproved-predictions-list/unapproved-predictions-list.component";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { PredictionsWithoutAnswerList } from "../../components/predictions-without-asnwer-list/predictions-without-answer-list.component";

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

  const [isUnapproved, setIsUnapproved] = useState(true);

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
        <>
          {isUnapproved ? (
            <>
              <Button
                onPress={() => setIsUnapproved(false)}
                mode="contained"
                color={colors.bg.primary}
              >
                PREDICTIONS WITHOUT ANSWER
              </Button>

              <Spacer position="top" size="large">
                <HorizontalDivider />
              </Spacer>

              <Spacer position="top" size="large">
                <View></View>
              </Spacer>

              <UnapprovedPredictionsList />
            </>
          ) : (
            <>
              <Button
                onPress={() => setIsUnapproved(true)}
                mode="contained"
                color={colors.bg.primary}
              >
                UNAPPROVED PREDICTIONS
              </Button>

              <Spacer position="top" size="large">
                <HorizontalDivider />
              </Spacer>

              <Spacer position="top" size="large">
                <View></View>
              </Spacer>

              <PredictionsWithoutAnswerList />
            </>
          )}
        </>
      )}
    </FantasyGameScreenContainer>
  );
};
