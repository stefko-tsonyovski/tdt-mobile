import React from "react";
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

export const GamesScreen = () => {
  return (
    <SafeArea>
      <GamesContainer>
        <FantasyGameCard />
        <Spacer position="top" size="large">
          <PredictBracketContainer>
            <PredictGameCard />
            <Spacer position="left" size="large">
              <BracketGameCard />
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
