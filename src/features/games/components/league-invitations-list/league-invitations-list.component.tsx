import React from "react";
import { useContext } from "react";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useByReceiver } from "../../../../services/league-invitations/league-invitations.service";
import { LeagueInvitationCard } from "../league-invitation-card/league-invitation-card.component";
import { ListHeading } from "../voted-prediction-list/voted-prediction-list.styles";

export const LeagueInvitationsList = () => {
  const { user } = useContext(AuthenticationContext);

  const { data: leagueInvitationsData, isLoading: isLoadingLeagueInvitations } =
    useByReceiver(user.email);

  return (
    <>
      {isLoadingLeagueInvitations ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <ListHeading variant="body">PENDING INVITATIONS</ListHeading>
          {leagueInvitationsData?.leagueInvitations?.length ? (
            leagueInvitationsData.leagueInvitations.map((leagueInvitation) => (
              <Spacer key={leagueInvitation._id} position="top" size="large">
                <LeagueInvitationCard leagueInvitation={leagueInvitation} />
              </Spacer>
            ))
          ) : (
            <Spacer position="top" size="large">
              <Text
                style={{ color: colors.bg.primary, textAlign: "center" }}
                variant="body"
              >
                NO PENDING INVITATIONS!
              </Text>
            </Spacer>
          )}
        </>
      )}
    </>
  );
};
