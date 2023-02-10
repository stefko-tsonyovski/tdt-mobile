import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GamesScreen } from "../../features/games/screens/games.screen";
import { FantasyGameScreen } from "../../features/games/screens/fantasy-game/fantasy-game.screen";

export type GamesRootStackParamList = {
  GamesMain: undefined;
  FantasyGame: undefined;
};

const Stack = createStackNavigator<GamesRootStackParamList>();

export const GamesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="GamesMain" component={GamesScreen} />
    <Stack.Screen name="FantasyGame" component={FantasyGameScreen} />
  </Stack.Navigator>
);
