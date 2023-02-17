import { useAtom } from "jotai";
import React, { useContext } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  useApproved,
  useUnapproved,
} from "../../../../services/predictions/predictions.service";
import { predictionsWithoutAnswerCurrentPageAtom } from "../../../../utils/atoms";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { PredictionsWithoutAnswerCard } from "../predictions-without-answer-card/predictions-without-answer-card.component";
import { UnapprovedPredictionCard } from "../unapproved-predictions-card/unapproved-predictions-card.component";

export const PredictionsWithoutAnswerList = () => {
  const { user } = useContext(AuthenticationContext);

  const [predictionsWithoutAnswerCurrentPage] = useAtom(
    predictionsWithoutAnswerCurrentPageAtom
  );

  const { data: predictionsData, isFetching: isFetchingPredictions } =
    useApproved(
      predictionsWithoutAnswerCurrentPage,
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
            PREDICTIONS WITHOUT ANSWER
          </Text>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          {predictionsData?.predictions?.length ? (
            <>
              {predictionsData.predictions.map((prediction) => (
                <PredictionsWithoutAnswerCard
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
              NO PREDICTIONS WITHOUT ANSWER!
            </Text>
          )}
        </>
      )}
    </>
  );
};
