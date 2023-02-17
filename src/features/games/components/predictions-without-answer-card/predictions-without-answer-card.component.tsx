import React, { FC, useContext } from "react";

import { useAtom } from "jotai";
import { predictionsWithoutAnswerCurrentPageAtom } from "../../../../utils/atoms";
import {
  Prediction,
  useUpdatePrediction,
} from "../../../../services/predictions/predictions.service";
import { Avatar, Button, Card, FAB } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";

export type PredictionCardProps = {
  prediction: Prediction;
  length: number;
};

export const PredictionsWithoutAnswerCard: FC<PredictionCardProps> = ({
  prediction,
  length,
}) => {
  const [predictionsCurrentPage, setPredictionsCurrentPage] = useAtom(
    predictionsWithoutAnswerCurrentPageAtom
  );

  const { mutate: updatePrediction, isLoading: isLoadingUpdate } =
    useUpdatePrediction();

  const handlePrevious = () =>
    setPredictionsCurrentPage(predictionsCurrentPage - 1);
  const handleNext = () =>
    setPredictionsCurrentPage(predictionsCurrentPage + 1);

  const handleCorrectAnswer = () => {
    if (predictionsCurrentPage > 1) {
      handlePrevious();
    } else {
      setPredictionsCurrentPage(1);
    }

    updatePrediction({ _id: prediction._id, answer: "correct" });
  };
  const handleWrongAnswer = () => {
    if (predictionsCurrentPage > 1) {
      handlePrevious();
    } else {
      setPredictionsCurrentPage(1);
    }

    updatePrediction({ _id: prediction._id, answer: "wrong" });
  };

  return (
    <>
      <Card style={{ backgroundColor: colors.bg.primary, borderRadius: 10 }}>
        <Card.Content>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Text
              style={{ backgroundColor: colors.bg.secondary }}
              size={30}
              label={
                prediction.creatorFirstName[0] + prediction.creatorLastName[0]
              }
            />
            <Spacer position="right" size="large">
              <View></View>
            </Spacer>
            <View>
              <Text style={{ color: colors.text.inverse }} variant="body">
                Posted by
              </Text>
              <Text style={{ color: colors.text.inverse }} variant="body">
                {prediction.creatorFirstName + prediction.creatorLastName}
              </Text>
            </View>
          </View>
          <Spacer position="top" size="large">
            <View></View>
          </Spacer>
          <Text style={{ color: colors.text.inverse }} variant="body">
            {prediction.content}
          </Text>
          <Text style={{ color: colors.text.inverse }} variant="body">
            3 points to play
          </Text>
        </Card.Content>
      </Card>

      <Spacer position="top" size="large">
        <View></View>
      </Spacer>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <FAB
          disabled={predictionsCurrentPage <= PLAYERS_INITIAL_PAGE}
          style={{ backgroundColor: colors.text.inverse }}
          icon="rewind"
          onPress={handlePrevious}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          color={colors.ui.error}
          style={{ backgroundColor: colors.text.inverse }}
          icon="alpha-x"
          onPress={handleWrongAnswer}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          style={{ backgroundColor: colors.text.inverse }}
          icon="check"
          color={colors.bg.primary}
          onPress={handleCorrectAnswer}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          disabled={predictionsCurrentPage >= length}
          style={{ backgroundColor: colors.text.inverse }}
          icon="fast-forward"
          onPress={handleNext}
        />
      </View>
    </>
  );
};
