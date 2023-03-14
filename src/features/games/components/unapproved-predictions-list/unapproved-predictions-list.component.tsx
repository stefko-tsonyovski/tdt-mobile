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
import { ListHeading } from "../voted-prediction-list/voted-prediction-list.styles";
import Spinner from "react-native-loading-spinner-overlay";

export const UnapprovedPredictionsList = () => {
  const [unapprovedPredictionsCurrentPage] = useAtom(
    unapprovedPredictionsCurrentPageAtom
  );

  const { data: predictionsData, isFetching: isFetchingPredictions } =
    useUnapproved(unapprovedPredictionsCurrentPage, PLAYERS_INITIAL_PAGE);

  return (
    <>
      {isFetchingPredictions ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <ListHeading variant="body">UNAPPROVED PREDICTIONS</ListHeading>

          <Spacer position="top" size="xl">
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
            <ListHeading variant="body">NO UNAPPROVED PREDICTIONS!</ListHeading>
          )}
        </>
      )}
    </>
  );
};
