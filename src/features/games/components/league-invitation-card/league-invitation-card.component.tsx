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

import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Text } from "../../../../components/typography/text.component";
import { useAtom } from "jotai";
import { fetchUsersByLeagueAtom } from "../../../../utils/atoms";
import {
  LeagueInvitation,
  useAcceptLeagueInvitation,
  useDeleteLeagueInvitation,
} from "../../../../services/league-invitations/league-invitations.service";

export type LeagueInvitationCardProps = {
  leagueInvitation: LeagueInvitation;
};

export const LeagueInvitationCard: FC<LeagueInvitationCardProps> = ({
  leagueInvitation,
}) => {
  const { user } = useContext(AuthenticationContext);

  const { mutate: acceptLeagueInvitation, isLoading: isLoadingAccept } =
    useAcceptLeagueInvitation();
  const { mutate: deleteLeagueInvitation, isLoading: isLoadingDelete } =
    useDeleteLeagueInvitation();

  const [, setFetchUsersByLeague] = useAtom(fetchUsersByLeagueAtom);

  const handleAcceptLeagueInvitation = () => {
    acceptLeagueInvitation({ id: leagueInvitation._id, email: user.email });
    setFetchUsersByLeague(true);
  };

  const handleDeleteLeagueInvitation = () =>
    deleteLeagueInvitation(leagueInvitation._id);

  return (
    <>
      {isLoadingAccept || isLoadingDelete ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <PredictionCardContainer>
            <Card.Content>
              <PredictionCardHeaderContainer>
                <PredictionCardAvatarText
                  size={30}
                  label={leagueInvitation.leagueName[0]}
                />
                <Spacer position="right" size="large">
                  <View></View>
                </Spacer>
                <View>
                  <PredictionCardText variant="body">
                    Posted by
                  </PredictionCardText>
                  <PredictionCardText variant="body">
                    {leagueInvitation.leagueName}
                  </PredictionCardText>
                  <PredictionCardText variant="body">
                    On: {leagueInvitation.formattedDate}
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
              onPress={handleDeleteLeagueInvitation}
              color={colors.ui.error}
              icon="alpha-x"
            />

            <Spacer position="right" size="large">
              <View></View>
            </Spacer>

            <PredictionCardFAB
              onPress={handleAcceptLeagueInvitation}
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
