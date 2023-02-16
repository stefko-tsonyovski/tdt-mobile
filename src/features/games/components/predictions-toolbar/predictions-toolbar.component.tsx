import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Chip, IconButton } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useGetTotal } from "../../../../services/predictions/predictions.service";
import { AddPrediction } from "../add-prediction/add-prediction.component";
import {
  PredictionPointsContainer,
  PredictionsToolbarContainer,
} from "./predictions-toolbar.styles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PredictionsGameRootStackParamList } from "../../../../infrastructure/navigation/predictions-game.navigator";
import { colors } from "../../../../infrastructure/theme/colors";

export type PredictionsGameScreenProps = NativeStackScreenProps<
  PredictionsGameRootStackParamList,
  "PredictionsMain"
>;

export const PredictionsToolbar: FC<PredictionsGameScreenProps> = ({
  navigation,
  route,
}) => {
  const { user } = useContext(AuthenticationContext);
  const { data: predictionPoints, isLoading: isLoadingPredictionPoints } =
    useGetTotal(user.email);

  return (
    <>
      {isLoadingPredictionPoints ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <PredictionsToolbarContainer>
          <IconButton
            icon="plus-circle"
            color={colors.bg.primary}
            onPress={() => navigation.navigate("AddPrediction")}
          />
          <PredictionPointsContainer>
            <Text variant="body">AVAILABLE</Text>
            <Text variant="body">{Number(predictionPoints)}p</Text>
          </PredictionPointsContainer>
          <Chip onPress={() => navigation.navigate("YourVotes")}>
            YOUR VOTES
          </Chip>
        </PredictionsToolbarContainer>
      )}
    </>
  );
};
