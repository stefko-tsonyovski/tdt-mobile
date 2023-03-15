import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Text } from "../../../../components/typography/text.component";
import { RankListRootStackParamList } from "../../../../infrastructure/navigation/rank-list.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Player,
  usePlayers,
} from "../../../../services/players/players.service";
import { CurrentWeek } from "../../../games/components/current-week/current-week.component";
import { PlayerCard } from "../../components/player-card/player-card.component";
import { HeadingBarContainer } from "../../components/player-card/player-card.styles";

export const AllPlayers = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RankListRootStackParamList>>();
  const { data, isLoading } = usePlayers();

  const renderItem = ({ item }: { item: Player }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PlayerDetails", { playerId: item.id })
        }
      >
        <PlayerCard player={item} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Player) => item.id.toString();

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
    <FlatList
      initialNumToRender={30}
      maxToRenderPerBatch={20}
      data={data.players}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={() => (
        <>
          <CurrentWeek />
          <HeadingBarContainer>
            <Text variant="body">#</Text>
            <Text variant="body">POINTS</Text>
          </HeadingBarContainer>
        </>
      )}
    />
  );
};
