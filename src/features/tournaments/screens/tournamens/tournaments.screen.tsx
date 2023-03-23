import React, { useEffect, useContext } from "react";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { TournamentsList } from "../../components/tournaments-list/tournaments-list.component";
import { TournamentsFilter } from "../../components/tournaments-filter/tournaments-filter.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { useSubscribeForPushNotifications } from "../../../../services/user-tokens/user-tokens.service";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { registerForPushNotificationsAsync } from "../../../../../App";

export const TournamentsScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const { mutate: subscribeForPushNotifications } =
    useSubscribeForPushNotifications();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      subscribeForPushNotifications({
        email: user.email,
        token: token as string,
      });
    });
  }, []);

  return (
    <>
      <Spacer position="bottom" size="large">
        <TournamentsFilter />
      </Spacer>
      <TournamentsList />
    </>
  );
};
