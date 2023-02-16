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
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";

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
  const { mutate: createVotePrediction } = useCreateVotePrediction();

  //   const { mutate: updatePrediction, isLoading: isLoadingUpdate } =
  //     useUpdatePrediction();

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

  return (
    <>
      {/* <Card
        sx={{
          backgroundColor: "#02563C",
          mt: 2,
          borderRadius: "15px",
          boxShadow: "0 0 5px #000",
        }}
      >
        <CardHeader
          sx={{
            color: "#FFF",
            "& span": {
              color: "#FFF",
            },
          }}
          avatar={
            <Avatar
              sx={{
                backgroundColor: "#D76316",
              }}
              aria-label="recipe"
            >
              {prediction.creatorFirstName[0] + prediction.creatorLastName[0]}
            </Avatar>
          }
          title="Posted by"
          subheader={
            prediction.creatorFirstName + " " + prediction.creatorLastName
          }
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "#FFF", fontSize: "15px" }}>
            {prediction.content}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#FFF", fontSize: "12px", mt: 3 }}
          >
            3 points to play
          </Typography>
        </CardContent>
      </Card> */}
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
          onPress={handleVoteWrong}
        />
        <Spacer position="right" size="large">
          <View></View>
        </Spacer>
        <FAB
          style={{ backgroundColor: colors.text.inverse }}
          icon="check"
          color={colors.bg.primary}
          onPress={handleVoteCorrect}
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
