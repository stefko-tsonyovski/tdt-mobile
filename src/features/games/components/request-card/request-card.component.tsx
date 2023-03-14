import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import {
  PredictionCardContainer,
  PredictionCardHeaderContainer,
  PredictionCardAvatarText,
  PredictionCardText,
  PredictionCardActionsContainer,
  PredictionCardFAB,
} from "../voted-prediction-card/voted-prediction-card.styles";
import {
  Request,
  useApproveRequest,
  useDeleteRequest,
} from "../../../../services/requests/requests.service";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Text } from "../../../../components/typography/text.component";
import { useAtom } from "jotai";
import { fetchUsersByLeagueAtom } from "../../../../utils/atoms";
import Spinner from "react-native-loading-spinner-overlay";

export type RequestCardProps = {
  request: Request;
};

export const RequestCard: FC<RequestCardProps> = ({ request }) => {
  const { user } = useContext(AuthenticationContext);

  const { mutate: approveRequest, isLoading: isLoadingApprove } =
    useApproveRequest();
  const { mutate: deleteRequest, isLoading: isLoadingDelete } =
    useDeleteRequest();

  const [, setFetchUsersByLeague] = useAtom(fetchUsersByLeagueAtom);

  const handleApproveRequest = () => {
    approveRequest({
      creatorId: request.creatorId,
      leagueId: request.leagueId,
      email: user.email,
    });
    setFetchUsersByLeague(true);
  };

  const handleDeleteRequest = () => deleteRequest(request._id);

  return (
    <>
      {isLoadingApprove || isLoadingDelete ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <PredictionCardContainer>
            <Card.Content>
              <PredictionCardHeaderContainer>
                <PredictionCardAvatarText
                  size={30}
                  label={
                    request.creatorFirstName[0] + request.creatorLastName[0]
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
                    {request.creatorFirstName + request.creatorLastName}
                  </PredictionCardText>
                  <PredictionCardText variant="body">
                    On: {request.formattedDate}
                  </PredictionCardText>
                </View>
              </PredictionCardHeaderContainer>
            </Card.Content>
          </PredictionCardContainer>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <PredictionCardActionsContainer>
            <Spacer position="right" size="large">
              <View></View>
            </Spacer>

            <PredictionCardFAB
              onPress={handleDeleteRequest}
              color={colors.ui.error}
              icon="alpha-x"
            />

            <Spacer position="right" size="large">
              <View></View>
            </Spacer>

            <PredictionCardFAB
              onPress={handleApproveRequest}
              icon="check"
              color={colors.bg.primary}
            />

            <Spacer position="right" size="large">
              <View></View>
            </Spacer>
          </PredictionCardActionsContainer>
          <Spacer position="top" size="large">
            <View></View>
          </Spacer>
        </>
      )}
    </>
  );
};
