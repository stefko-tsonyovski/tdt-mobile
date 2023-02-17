import { useAtom } from "jotai";
import React, { useContext } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useApproved } from "../../../../services/predictions/predictions.service";
import { approvedPredictionsCurrentPageAtom } from "../../../../utils/atoms";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { PredictionCard } from "../predictions-card/predictions-card.component";
import { ListHeading } from "../voted-prediction-list/voted-prediction-list.styles";

export const PredictionsList = () => {
  const { user } = useContext(AuthenticationContext);

  const [approvedPredictionsCurrentPage] = useAtom(
    approvedPredictionsCurrentPageAtom
  );

  const { data: predictionsData, isFetching: isFetchingPredictions } =
    useApproved(
      approvedPredictionsCurrentPage,
      PLAYERS_INITIAL_PAGE,
      user.email
    );

  return (
    <>
      {isFetchingPredictions ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <ListHeading variant="body">PREDICTIONS</ListHeading>

          <Spacer position="top" size="xl">
            <View></View>
          </Spacer>

          {predictionsData?.predictions?.length ? (
            <>
              {predictionsData.predictions.map((prediction) => (
                <PredictionCard
                  key={prediction._id}
                  prediction={prediction}
                  length={predictionsData.totalItems}
                />
              ))}
            </>
          ) : (
            <ListHeading variant="body">NO PREDICTIONS!</ListHeading>
          )}
        </>
      )}
    </>
  );
};
