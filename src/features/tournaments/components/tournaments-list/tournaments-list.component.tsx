import React from "react";
import { Text } from "../../../../components/typography/text.component";
import { Card } from "react-native-paper";
import {
  useAllTournaments,
  useAllTournamentsByDate,
} from "../../../../services/tournaments/tournaments.service";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { selectedDateAtom } from "../../../../utils/atoms";

export const TournamentsList = () => {
  const [date] = useAtom(selectedDateAtom);
  const { data, isLoading, isError, error } =
    useAllTournamentsByDate("2023-02-14");

  if (isError) {
    <Text variant="body">{(error as AxiosError).message}</Text>;
  }

  return (
    <>
      {!isLoading && data ? (
        data?.tournaments?.map((tournament) => {
          return (
            <Card>
              <Card.Title
                title={tournament.countryName}
                subtitle={tournament.name}
              />
            </Card>
          );
        })
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
