import React, { useContext } from "react";
import { Text } from "../../../../components/typography/text.component";
import { Card, Divider } from "react-native-paper";
import {
  useAllTournaments,
  useAllTournamentsByDate,
} from "../../../../services/tournaments/tournaments.service";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { selectedDateAtom } from "../../../../utils/atoms";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { TournamentItemCard } from "../tournament-item-card/tournament-item-card.component";

export const TournamentsList = () => {
  const [date] = useAtom(selectedDateAtom);
  const { user } = useContext(AuthenticationContext);
  const { data, isLoading, isError, error } = useAllTournamentsByDate(
    date,
    user?.email
  );

  if (isError) {
    <Text variant="body">{(error as AxiosError).message}</Text>;
  }

  return (
    <>
      {!isLoading && data ? (
        data?.tournaments?.length > 0 ? (
          data?.tournaments?.map((tournament) => {
            return (
              <TournamentItemCard key={tournament.id} tournament={tournament} />
            );
          })
        ) : (
          <>
            <Divider />
            <Text variant="body">No Matches</Text>
          </>
        )
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};