import React, { FC } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "../../../../components/typography/text.component";
import { RankListRootStackParamList } from "../../../../infrastructure/navigation/rank-list.navigator";
import { useSinglePlayer } from "../../../../services/players/players.service";
import CountryFlag from "react-native-country-flag";
import {
  CardHeaderPlayerContainer,
  PlayerImage,
} from "../../components/player-details/player-details.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Card, Colors, Divider } from "react-native-paper";
import { PlayerResults } from "../../components/player-results/player-results.component";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";

type PlayerDetailsScreenProps = NativeStackScreenProps<
  RankListRootStackParamList,
  "PlayerDetails"
>;

export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { playerId } = route.params;

  const { data, isLoading } = useSinglePlayer(playerId);

  if (isLoading || !data) {
    return (
      <Spinner visible={true} textStyle={{ color: colors.text.inverse }} />
    );
  }

  const {
    player: { name, gender, countryKey, ranking, imageUrl },
  } = data;

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
      <Spacer position="top" size="large">
        <PlayerResults playerId={playerId} />
      </Spacer>
    </>
  );
};
