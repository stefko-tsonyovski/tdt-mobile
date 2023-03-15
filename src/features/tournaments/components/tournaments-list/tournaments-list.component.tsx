import React, { useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";
import { NoData } from "../../../../components/no-data/no-data.component";

export const TournamentsList = () => {
  const [date] = useAtom(selectedDateAtom);
  const { user } = useContext(AuthenticationContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<TournamentsRootStackParamList>>();
  const { data, isLoading, isError, error } = useAllTournamentsByDate(
    date,
    user?.email
  );

  if (isError) {
    <Text variant="body">{(error as AxiosError).message}</Text>;
  }

  const renderItem = ({ item }: { item: Tournament }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() =>
          navigation.navigate("SingleTournamentMatches", {
            tournamentId: item.id,
            date: date,
          })
        }
      >
        <TournamentItemCard tournament={item} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Tournament, index: number) => item.id.toString();

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <>
      {data.tournaments && data.tournaments.length > 0 ? (
        <FlatList
          initialNumToRender={8}
          maxToRenderPerBatch={16}
          data={data.tournaments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <NoData message="No Tournaments" />
      )}
    </>
  );
};
