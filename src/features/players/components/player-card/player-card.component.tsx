import React, { FC } from "react";
import { View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Card, Colors } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { Player } from "../../../../services/players/players.service";

type PlayerCardProps = {
  player: Player;
};

export const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  const { countryKey, name, ranking, points } = player;

  return (
    <Card.Title
      style={{ borderBottomWidth: 1, borderBottomColor: `${Colors.grey400}` }}
      leftStyle={{ flex: 0.15 }}
      rightStyle={{ flex: 0.2 }}
      left={() => <Text variant="body">{ranking}.</Text>}
      title={
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Spacer position="right" size="medium">
            <CountryFlag size={25} isoCode={countryKey} />
          </Spacer>
          <Text variant="body">{name}</Text>
        </View>
      }
      right={() => <Text variant="body">{points}</Text>}
    />
  );
};
