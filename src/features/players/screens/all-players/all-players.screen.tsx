import React, { useCallback } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "../../../../components/typography/text.component";
import {
  Player,
  usePlayers,
} from "../../../../services/players/players.service";
import { PlayerCard } from "../../components/player-card/player-card.component";

export const AllPlayers = () => {
  const { data, isLoading } = usePlayers();

  const renderItem = useCallback(
    ({ item }: { item: Player }) => {
      return <PlayerCard player={item} />;
    },
    [data]
  );

  const keyExtractor = useCallback((item: Player) => item.id.toString(), []);
  return (
    <View>
      {!isLoading && data ? (
        <FlatList
          initialNumToRender={16}
          maxToRenderPerBatch={4}
          data={data.players}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </View>
  );
};
