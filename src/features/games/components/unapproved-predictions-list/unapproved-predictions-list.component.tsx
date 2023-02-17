import { useAtom } from "jotai";
import React from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { useUnapproved } from "../../../../services/predictions/predictions.service";
import { unapprovedPredictionsCurrentPageAtom } from "../../../../utils/atoms";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { UnapprovedPredictionCard } from "../unapproved-predictions-card/unapproved-predictions-card.component";

export const UnapprovedPredictionsList = () => {
  const [unapprovedPredictionsCurrentPage] = useAtom(
    unapprovedPredictionsCurrentPageAtom
  );

  const { data: predictionsData, isFetching: isFetchingPredictions } =
    useUnapproved(unapprovedPredictionsCurrentPage, PLAYERS_INITIAL_PAGE);

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
            UNAPPROVED PREDICTIONS
          </Text>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          {predictionsData?.predictions?.length ? (
            <>
              {predictionsData.predictions.map((prediction) => (
                <UnapprovedPredictionCard
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
              NO UNAPPROVED PREDICTIONS!
            </Text>
          )}
        </>
      )}
    </>
  );
};
