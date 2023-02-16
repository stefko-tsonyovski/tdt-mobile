import React, { FC } from "react";
import { Text, View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { BracketGameCard } from "../components/bracket-game-card/bracket-game-card.component";
import { Dashboard } from "../components/dashboard/dashboard.component";
import { FantasyGameCard } from "../components/fantasy-game-card/fantasy-game-card.component";
import {
  GamesContainer,
  PredictBracketContainer,
} from "../components/games.styles";
import { PredictGameCard } from "../components/predict-game-card/predict-game-card.component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GamesRootStackParamList } from "../../../infrastructure/navigation/games.navigator";

export type GamesScreenProps = NativeStackScreenProps<
  GamesRootStackParamList,
  "GamesMain"
>;

export const GamesScreen: FC<GamesScreenProps> = ({ navigation, route }) => {
  return (
    <SafeArea>
      <GamesContainer>
        <FantasyGameCard navigation={navigation} route={route} />
        <Spacer position="top" size="large">
          <PredictBracketContainer>
            <PredictGameCard navigation={navigation} route={route} />
            <Spacer position="left" size="large">
              <BracketGameCard navigation={navigation} route={route} />
            </Spacer>
          </PredictBracketContainer>
        </Spacer>
        <Spacer position="top" size="large">
          <Dashboard />
        </Spacer>
      </GamesContainer>
    </SafeArea>
  );
};
