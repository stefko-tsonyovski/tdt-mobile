import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  MatchCardViewModel,
  useMatchesByTournamentAndDate,
} from "../../../../services/matches/matches.service";
import { MatchCard } from "../match-card/match-card.component";

type MatchesListProps = {
  tournamentId: number;
  date: string;
};

export const MatchesList: FC<MatchesListProps> = ({ tournamentId, date }) => {
  const { user } = useContext(AuthenticationContext);
  const { data, isLoading } = useMatchesByTournamentAndDate(
    tournamentId,
    date,
    user?.email
  );

  const navigation =
    useNavigation<NavigationProp<TournamentsRootStackParamList>>();

  const renderItem = ({ item }: { item: MatchCardViewModel }) => {
    return (
      <TouchableOpacity
        style={{ marginHorizontal: 8, marginBottom: 8 }}
        onPress={() =>
          navigation.navigate("MatchDetails", { matchId: item.id })
        }
      >
        <MatchCard match={item} />
      </TouchableOpacity>
    );
  };
  const keyExtractor = (item: MatchCardViewModel) => item.id.toString();

  return (
    <>
      {!isLoading &&
        data &&
        (data.matches?.length ? (
          <Spacer position="top" size="medium">
            <FlatList
              data={data.matches}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </Spacer>
        ) : (
          <>
            <Divider />
            <Text variant="body">No Matches</Text>
            <Divider />
          </>
        ))}
    </>
  );
};
