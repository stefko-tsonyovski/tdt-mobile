import React, { FC } from "react";
import { View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Card, Colors, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { Player } from "../../../../services/players/players.service";
import {
  CardHeaderPlayerContainer,
  PlayerImage,
} from "../player-details/player-details.styles";

type PlayerHeadingCardProps = {
  name: string;
  gender: string;
  countryKey: string;
  ranking: number;
  imageUrl: string;
};

export const PlayerHeadingCard: FC<PlayerHeadingCardProps> = ({
  name,
  gender,
  countryKey,
  ranking,
  imageUrl,
}) => {
  return (
    <>
      <CardHeaderPlayerContainer>
        <Spacer position="left" size="medium">
          <Spacer position="bottom" size="medium">
            <CountryFlag size={25} isoCode={countryKey} />
          </Spacer>
        </Spacer>
        <Card
          style={{
            backgroundColor: "transparent",
            elevation: 0,
          }}
        >
          <Card.Title
            left={() => <PlayerImage source={{ uri: imageUrl }} />}
            titleStyle={{
              marginLeft: 15,
            }}
            titleNumberOfLines={2}
            title={name}
          />
        </Card>
        <Divider />
        <Spacer position="top" size="medium">
          <View style={{ flexDirection: "row" }}>
            <Spacer position="right" size="small">
              <Ionicons
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 5,
                }}
                name="cellular"
                size={20}
                color={Colors.grey700}
              />
            </Spacer>
            <Text>
              {gender === "male" ? `ATP: ${ranking}` : `WTA: ${ranking}`}
            </Text>
          </View>
        </Spacer>
      </CardHeaderPlayerContainer>
      <Spacer position="top" size="large">
        <Text textAlign="center">Results</Text>
      </Spacer>
    </>
  );
};
