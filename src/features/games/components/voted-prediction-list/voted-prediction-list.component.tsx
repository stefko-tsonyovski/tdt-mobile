import { useAtom } from "jotai";
import React, { useContext } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  useApproved,
  useVotedPredictionsByUser,
} from "../../../../services/predictions/predictions.service";
import {
  approvedPredictionsCurrentPageAtom,
  votePredictionsCurrentPageAtom,
} from "../../../../utils/atoms";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { PredictionCard } from "../predictions-card/predictions-card.component";
import { VotedPredictionCard } from "../voted-prediction-card/voted-prediction-card.component";

export const VotedPredictionsList = () => {
  const { user } = useContext(AuthenticationContext);

  const [votePredictionsCurrentPage] = useAtom(votePredictionsCurrentPageAtom);

  const { data: predictionsData, isFetching: isFetchingPredictions } =
    useVotedPredictionsByUser(
      votePredictionsCurrentPage,
      PLAYERS_INITIAL_PAGE,
      user.email
    );

  return (
    <>
      {isFetchingPredictions ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <Text
            style={{
              textAlign: "center",
              color: colors.bg.primary,
              fontSize: 20,
            }}
            variant="body"
          >
            YOUR VOTES
          </Text>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          {predictionsData?.votePredictions?.length ? (
            <>
              {predictionsData.votePredictions.map((prediction) => (
                <VotedPredictionCard
                  key={prediction._id}
                  prediction={prediction}
                  length={predictionsData.totalItems}
                />
              ))}
            </>
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: colors.bg.primary,
                fontSize: 20,
              }}
              variant="body"
            >
              NO VOTES!
            </Text>
          )}
        </>
      )}
    </>
  );
};
