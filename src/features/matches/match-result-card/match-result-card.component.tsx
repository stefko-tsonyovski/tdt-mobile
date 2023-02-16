import React, { FC } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Match } from "../../../services/matches/matches.service";

type MatchResultCardProps = {
  match: Match;
};

export const MatchResultCard: FC<MatchResultCardProps> = ({ match }) => {
  const { homeId, homeSets, awayId, awaySets } = match;

  return (
    <Spacer position="top" size="medium">
      <Card>
        <Card.Content>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.9 }}>
              <Text variant="body">{homeId}</Text>
            </View>
            <View style={{ flex: 0.1 }}>
              <Text variant="body">{homeSets}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.9 }}>
              <Text variant="body">{awayId}</Text>
            </View>
            <View style={{ flex: 0.1 }}>
              <Text variant="body">{awaySets}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Spacer>
  );
};
