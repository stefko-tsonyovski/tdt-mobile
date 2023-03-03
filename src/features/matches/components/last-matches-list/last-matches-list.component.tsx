import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import React, { FC, useContext } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  MatchCardViewModel,
  useLastMatchesByPlayer,
} from "../../../../services/matches/matches.service";
import { selectedSurfaceAtom } from "../../../../utils/atoms";
import { LastMatchCard } from "../last-match-card/last-match-card.component";

type LastMatchesListProps = {
  matchId: number;
  playerId: number;
};

export const LastMatchesList: FC<LastMatchesListProps> = ({
  matchId,
  playerId,
}) => {
  const navigation =
    useNavigation<NavigationProp<TournamentsRootStackParamList>>();
  const [surface] = useAtom(selectedSurfaceAtom);
  const { user } = useContext(AuthenticationContext);
  const { data, isLoading } = useLastMatchesByPlayer({
    skipMatchId: matchId,
    playerId: playerId,
    surface,
    email: user?.email,
  });

  const renderItem = ({ item }: { item: MatchCardViewModel }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MatchDetails", { matchId: item.id })
        }
      >
        <LastMatchCard match={item} playerId={playerId} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: MatchCardViewModel) => item.id.toString();

  return !isLoading && data ? (
    data.matches && data.matches.length ? (
      <View>
        <Spacer position="bottom" size="medium">
          <Text variant="body">Last matches: {data.player?.name}</Text>
        </Spacer>
        <FlatList
          initialNumToRender={2}
          maxToRenderPerBatch={4}
          data={data.matches}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    ) : (
      <></>
    )
  ) : (
    <Text variant="body">Loading...</Text>
  );
};
