import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../../components/typography/text.component";
import { RankListRootStackParamList } from "../../../../infrastructure/navigation/rank-list.navigator";
import {
  Player,
  usePlayers,
} from "../../../../services/players/players.service";
import { CurrentWeek } from "../../../games/components/current-week/current-week.component";
import { PlayerCard } from "../../components/player-card/player-card.component";
import { HeadingBarContainer } from "../../components/player-card/player-card.styles";

export const AllPlayers = () => {
  const { data, isLoading } = usePlayers();

  const renderItem = ({ item }: { item: Player }) => {
    return <PlayerCard player={item} />;
  };

  const keyExtractor = (item: Player) => item.id.toString();
  return (
    <View>
      {!isLoading && data ? (
        <FlatList
          initialNumToRender={16}
          maxToRenderPerBatch={4}
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
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </View>
  );
};
