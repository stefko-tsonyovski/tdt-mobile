import React, { FC, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { FlatList } from "react-native-gesture-handler";
import { Card, Colors, Divider, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  Match,
  MatchCardViewModel,
  useMatchesByTournamentAndDate,
} from "../../../../services/matches/matches.service";
import { MatchCard } from "../match-card/match-card.component";
import {
  PlayerContainer,
  PlayerName,
  PlayerSets,
} from "../match-result-card/match-result-card.styles";

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

  const renderItem = ({ item }: { item: MatchCardViewModel }) => {
    return (
      <TouchableOpacity style={{ marginHorizontal: 8, marginBottom: 8 }}>
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
