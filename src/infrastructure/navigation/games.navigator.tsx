import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GamesScreen } from "../../features/games/screens/games.screen";
import { FantasyGameScreen } from "../../features/games/screens/fantasy-game/fantasy-game.screen";
import { BracketGameScreen } from "../../features/games/screens/bracket-game/bracket-game.screen";
import { PredictionsGameScreen } from "../../features/games/screens/prediction-game/predictions-game.screen";
import { YourVotesScreen } from "../../features/games/screens/your-votes/your-votes.screen";
import { PredictionsGameNavigator } from "./predictions-game.navigator";

export type GamesRootStackParamList = {
  GamesMain: undefined;
  FantasyGame: undefined;
  BracketGame: undefined;
  PredictGame: undefined;
  YourVotes: undefined;
};

const Stack = createStackNavigator<GamesRootStackParamList>();

export const GamesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: "#FFF" },
    }}
  >
    <Stack.Screen
      options={({}) => ({ headerShown: false })}
      name="GamesMain"
      component={GamesScreen}
    />
    <Stack.Screen
      options={({}) => ({ title: "Team" })}
      name="FantasyGame"
      component={FantasyGameScreen}
    />
    <Stack.Screen
      options={({}) => ({ title: "Bracket" })}
      name="BracketGame"
      component={BracketGameScreen}
    />
    <Stack.Screen
      options={({}) => ({ title: "Predict" })}
      name="PredictGame"
      component={PredictionsGameNavigator}
    />
  </Stack.Navigator>
);
