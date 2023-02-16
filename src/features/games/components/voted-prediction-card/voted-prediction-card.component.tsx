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
      <Card style={{ backgroundColor: colors.bg.primary, borderRadius: 10 }}>
        <Card.Content>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Text
              style={{ backgroundColor: colors.bg.secondary }}
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
              <Text style={{ color: colors.text.inverse }} variant="body">
                Posted by
              </Text>
              <Text style={{ color: colors.text.inverse }} variant="body">
                {prediction.prediction.creatorFirstName +
                  prediction.prediction.creatorLastName}
              </Text>
            </View>
          </View>
          <Spacer position="top" size="large">
            <View></View>
          </Spacer>
          <Text style={{ color: colors.text.inverse }} variant="body">
            {prediction.prediction.content}
          </Text>
          <Text style={{ color: colors.text.inverse }} variant="body">
            3 points to play
          </Text>
          <Text style={{ color: colors.text.inverse }} variant="body">
            Prediction guess: {prediction.answer}
          </Text>
        </Card.Content>
      </Card>

      <Spacer position="top" size="large">
        <View></View>
      </Spacer>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <FAB
          disabled={votePredictionsCurrentPage <= PLAYERS_INITIAL_PAGE}
          style={{ backgroundColor: colors.text.inverse }}
          icon="rewind"
          onPress={handlePrevious}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          color={colors.bg.primary}
          style={{ backgroundColor: colors.text.inverse }}
          icon="alert-circle-check-outline"
          onPress={handleVerifyVotePrediction}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          disabled={votePredictionsCurrentPage >= length}
          style={{ backgroundColor: colors.text.inverse }}
          icon="fast-forward"
          onPress={handleNext}
        />
      </View>
    </>
  );
};
