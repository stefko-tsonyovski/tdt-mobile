import React, { FC } from "react";

import { useAtom } from "jotai";
import { unapprovedPredictionsCurrentPageAtom } from "../../../../utils/atoms";
import {
  Prediction,
  useApprovePrediction,
  useDeletePrediction,
} from "../../../../services/predictions/predictions.service";
import { Avatar, Card, FAB } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { View, Animated } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { useSwipe } from "../../../../infrastructure/swipe/use-swipe.hook";

export type PredictionCardProps = {
  prediction: Prediction;
  length: number;
};

export const UnapprovedPredictionCard: FC<PredictionCardProps> = ({
  prediction,
  length,
}) => {
  const [predictionsCurrentPage, setPredictionsCurrentPage] = useAtom(
    unapprovedPredictionsCurrentPageAtom
  );

  const { mutate: approvePrediction } = useApprovePrediction();
  const { mutate: deletePrediction } = useDeletePrediction();

  const handlePrevious = () =>
    setPredictionsCurrentPage(predictionsCurrentPage - 1);
  const handleNext = () =>
    setPredictionsCurrentPage(predictionsCurrentPage + 1);

  const handleApprove = () => {
    if (predictionsCurrentPage > 1) {
      handlePrevious();
    } else {
      setPredictionsCurrentPage(PLAYERS_INITIAL_PAGE);
    }

    approvePrediction(prediction._id);
  };
  const handleDelete = () => {
    if (predictionsCurrentPage > 1) {
      handlePrevious();
    } else {
      setPredictionsCurrentPage(PLAYERS_INITIAL_PAGE);
    }

    deletePrediction(prediction._id);
  };

  // const onSwipeLeft = () => console.log("swipe left");
  // const onSwipeRight = () => console.log("swipe right");

  // const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  return (
    <Animated.View>
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
          onPress={handleDelete}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          style={{ backgroundColor: colors.text.inverse }}
          icon="check"
          color={colors.bg.primary}
          onPress={handleApprove}
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
    </Animated.View>
  );
};
