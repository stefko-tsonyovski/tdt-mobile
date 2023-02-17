import React, { FC, useContext } from "react";

import { useAtom } from "jotai";
import {
  approvedPredictionsCurrentPageAtom,
  votePredictionsCurrentPageAtom,
} from "../../../../utils/atoms";
import {
  VotePrediction,
  useCreateVotePrediction,
  useVerifyVotePrediction,
} from "../../../../services/predictions/predictions.service";
import { Avatar, Button, Card, FAB } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  PredictionCardActionsContainer,
  PredictionCardAvatarText,
  PredictionCardContainer,
  PredictionCardFAB,
  PredictionCardHeaderContainer,
  PredictionCardText,
} from "./voted-prediction-card.styles";

export type VotedPredictionCardProps = {
  prediction: VotePrediction;
  length: number;
};

export const VotedPredictionCard: FC<VotedPredictionCardProps> = ({
  prediction,
  length,
}) => {
  const { user } = useContext(AuthenticationContext);
  const [votePredictionsCurrentPage, setVotePredictionsCurrentPage] = useAtom(
    votePredictionsCurrentPageAtom
  );

  const { mutate: verifyVotePrediction } = useVerifyVotePrediction();

  const handlePrevious = () =>
    setVotePredictionsCurrentPage(votePredictionsCurrentPage - 1);
  const handleNext = () =>
    setVotePredictionsCurrentPage(votePredictionsCurrentPage + 1);

  const handleVerifyVotePrediction = () => {
    verifyVotePrediction({
      votePredictionId: prediction._id,
      email: user.email,
    });
  };

  return (
    <>
      <PredictionCardContainer>
        <Card.Content>
          <PredictionCardHeaderContainer>
            <PredictionCardAvatarText
              size={30}
              label={
                prediction.prediction.creatorFirstName[0] +
                prediction.prediction.creatorLastName[0]
              }
            />
            <Spacer position="right" size="large">
              <View></View>
            </Spacer>
            <View>
              <PredictionCardText variant="body">Posted by</PredictionCardText>
              <PredictionCardText variant="body">
                {prediction.prediction.creatorFirstName +
                  prediction.prediction.creatorLastName}
              </PredictionCardText>
            </View>
          </PredictionCardHeaderContainer>
          <Spacer position="top" size="large">
            <View></View>
          </Spacer>
          <PredictionCardText variant="body">
            {prediction.prediction.content}
          </PredictionCardText>
          <PredictionCardText variant="body">
            3 points to play
          </PredictionCardText>
          <PredictionCardText variant="body">
            Prediction guess: {prediction.answer}
          </PredictionCardText>
        </Card.Content>
      </PredictionCardContainer>

      <Spacer position="top" size="large">
        <View></View>
      </Spacer>

      <PredictionCardActionsContainer>
        <PredictionCardFAB
          disabled={votePredictionsCurrentPage <= PLAYERS_INITIAL_PAGE}
          icon="rewind"
          onPress={handlePrevious}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <PredictionCardFAB
          color={colors.bg.primary}
          icon="alert-circle-check-outline"
          onPress={handleVerifyVotePrediction}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <PredictionCardFAB
          disabled={votePredictionsCurrentPage >= length}
          icon="fast-forward"
          onPress={handleNext}
        />
      </PredictionCardActionsContainer>
    </>
  );
};
