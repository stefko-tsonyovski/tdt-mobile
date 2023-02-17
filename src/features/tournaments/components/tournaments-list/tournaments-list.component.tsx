import React, { FC, useCallback, useContext } from "react";
import { Text } from "../../../../components/typography/text.component";
import { Divider } from "react-native-paper";
import {
  Tournament,
  useAllTournamentsByDate,
} from "../../../../services/tournaments/tournaments.service";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { selectedDateAtom } from "../../../../utils/atoms";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { TournamentItemCard } from "../tournament-item-card/tournament-item-card.component";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

  const renderItem = useCallback(
    ({ item }: { item: Tournament }) => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("TournamentDetails", {
              tournamentId: item.id,
            })
          }
        >
          <TournamentItemCard tournament={item} />
        </TouchableOpacity>
      );
    },
    [data]
  );

  const keyExtractor = useCallback(
    (item: Tournament, index: number) => item.id.toString(),
    [data]
  );

  return (
    <>
      {!isLoading && data ? (
        data?.tournaments?.length > 0 ? (
          <FlatList
            initialNumToRender={8}
            maxToRenderPerBatch={16}
            data={data.tournaments}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
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
