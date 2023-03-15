import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FC, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { NoData } from "../../../../components/no-data/no-data.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
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
      {data.matches && data.matches.length > 0 ? (
        <Spacer position="top" size="medium">
          <FlatList
            data={data.matches}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </Spacer>
      ) : (
        <NoData message="No Matches" />
      )}
    </>
  );
};
