import React, { FC, useContext } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type TournamentsListProps = {
  navigation: NativeStackNavigationProp<
    TournamentsRootStackParamList,
    "AllTournaments"
  >;
};

export const TournamentsList: FC<TournamentsListProps> = ({ navigation }) => {
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
              <TouchableOpacity
                key={tournament.id}
                onPress={() =>
                  navigation.navigate("TournamentDetails", {
                    tournamentId: tournament.id,
                  })
                }
              >
                <TournamentItemCard tournament={tournament} />
              </TouchableOpacity>
            );
          })
        ) : (
          <>
            <Divider />
            <Text variant="body">No Matches</Text>
            <Divider />
          </>
        )
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
