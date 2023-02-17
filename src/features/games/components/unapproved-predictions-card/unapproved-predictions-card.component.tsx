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
import { View, Animated, Dimensions } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import {
  PredictionCardActionsContainer,
  PredictionCardAvatarText,
  PredictionCardContainer,
  PredictionCardFAB,
  PredictionCardHeaderContainer,
  PredictionCardText,
} from "../voted-prediction-card/voted-prediction-card.styles";

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

  const { mutate: approvePrediction, isLoading: isLoadingApprove } =
    useApprovePrediction();
  const { mutate: deletePrediction, isLoading: isLoadingDelete } =
    useDeletePrediction();

  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const y = new Animated.Value(0);
  const windowHeight = Dimensions.get("window").height;

  const TopOrBottom = y.interpolate({
    inputRange: [0, windowHeight / 2 - 1, windowHeight / 2],
    outputRange: [1, 1, -1],
    extrapolate: "clamp",
  });

  const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
    inputRange: [-500, 500],
    outputRange: [`-15deg`, `15deg`],
    extrapolate: "clamp",
  });

  const reset = Animated.parallel([
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]);

  const handlePan = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: new Animated.Value(0),
          y,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePanStateChange = ({
    nativeEvent,
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    const { state, translationX } = nativeEvent;

    if (state === 5) {
      if (translationX > 185) {
        handleApprove();
      } else if (translationX < -185) {
        handleDelete();
      } else {
        reset.start();
      }
    }
  };

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
    <>
      {isLoadingApprove || isLoadingDelete ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <PanGestureHandler
            onHandlerStateChange={handlePanStateChange}
            onGestureEvent={handlePan}
          >
            <Animated.View
              style={{
                transform: [{ translateX }, { translateY }, { rotate }],
              }}
            >
              <PredictionCardContainer>
                <Card.Content>
                  <PredictionCardHeaderContainer>
                    <PredictionCardAvatarText
                      size={30}
                      label={
                        prediction.creatorFirstName[0] +
                        prediction.creatorLastName[0]
                      }
                    />
                    <Spacer position="right" size="large">
                      <View></View>
                    </Spacer>
                    <View>
                      <PredictionCardText variant="body">
                        Posted by
                      </PredictionCardText>
                      <PredictionCardText variant="body">
                        {prediction.creatorFirstName +
                          prediction.creatorLastName}
                      </PredictionCardText>
                    </View>
                  </PredictionCardHeaderContainer>
                  <Spacer position="top" size="large">
                    <View></View>
                  </Spacer>
                  <PredictionCardText variant="body">
                    {prediction.content}
                  </PredictionCardText>
                  <PredictionCardText variant="body">
                    3 points to play
                  </PredictionCardText>
                </Card.Content>
              </PredictionCardContainer>
            </Animated.View>
          </PanGestureHandler>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <PredictionCardActionsContainer>
            <PredictionCardFAB
              disabled={predictionsCurrentPage <= PLAYERS_INITIAL_PAGE}
              icon="rewind"
              onPress={handlePrevious}
            />
            <Spacer position="right" size="large">
              <View></View>
            </Spacer>
            <PredictionCardFAB
              color={colors.ui.error}
              icon="alpha-x"
              onPress={handleDelete}
            />
            <Spacer position="right" size="large">
              <View></View>
            </Spacer>
            <PredictionCardFAB
              icon="check"
              color={colors.bg.primary}
              onPress={handleApprove}
            />
            <Spacer position="right" size="large">
              <View></View>
            </Spacer>
            <PredictionCardFAB
              disabled={predictionsCurrentPage >= length}
              icon="fast-forward"
              onPress={handleNext}
            />
          </PredictionCardActionsContainer>
        </>
      )}
    </>
  );
};
