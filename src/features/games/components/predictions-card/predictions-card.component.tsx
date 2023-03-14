import React, { FC, useContext } from "react";

import { useAtom } from "jotai";
import { approvedPredictionsCurrentPageAtom } from "../../../../utils/atoms";
import {
  Prediction,
  useCreateVotePrediction,
} from "../../../../services/predictions/predictions.service";
import { Avatar, Button, Card, FAB } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { Animated, Dimensions, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
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
import { PredictionCardPostedByContainer } from "./predictions-card.styles";
import Spinner from "react-native-loading-spinner-overlay";

export type PredictionCardProps = {
  prediction: Prediction;
  length: number;
};

export const PredictionCard: FC<PredictionCardProps> = ({
  prediction,
  length,
}) => {
  const { user } = useContext(AuthenticationContext);
  const [predictionsCurrentPage, setPredictionsCurrentPage] = useAtom(
    approvedPredictionsCurrentPageAtom
  );
  const { mutate: createVotePrediction, isLoading } = useCreateVotePrediction();

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
        handleVoteCorrect();
      } else if (translationX < -185) {
        handleVoteWrong();
      } else {
        reset.start();
      }
    }
  };

  const handlePrevious = () =>
    setPredictionsCurrentPage(predictionsCurrentPage - 1);
  const handleNext = () =>
    setPredictionsCurrentPage(predictionsCurrentPage + 1);

  const handleVoteCorrect = () => {
    const inputModel = {
      _id: prediction._id,
      answer: "correct",
      email: user.email,
    };

    createVotePrediction(inputModel);
  };

  const handleVoteWrong = () => {
    const inputModel = {
      _id: prediction._id,
      answer: "wrong",
      email: user.email,
    };

    createVotePrediction(inputModel);
  };

  if (isLoading) {
    return (
      <Spinner
        visible={true}
        textContent={"This may take a while..."}
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <>
      <PanGestureHandler
        onGestureEvent={handlePan}
        onHandlerStateChange={handlePanStateChange}
      >
        <Animated.View
          style={{ transform: [{ translateX }, { translateY }, { rotate }] }}
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
                <PredictionCardPostedByContainer>
                  <PredictionCardText variant="body">
                    Posted by:
                  </PredictionCardText>
                  <PredictionCardText variant="body">
                    {prediction.creatorFirstName + prediction.creatorLastName}
                  </PredictionCardText>
                </PredictionCardPostedByContainer>
                <View>
                  <PredictionCardText variant="body">
                    Expires in:
                  </PredictionCardText>
                  <PredictionCardText variant="body">
                    {prediction.countdownDays} days :{" "}
                    {prediction.countdownHours} hours :{" "}
                    {prediction.countdownMinutes} minutes
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
          onPress={handleVoteWrong}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <PredictionCardFAB
          icon="check"
          color={colors.bg.primary}
          onPress={handleVoteCorrect}
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
  );
};
