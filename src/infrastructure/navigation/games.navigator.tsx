import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GamesScreen } from "../../features/games/screens/games.screen";
import { FantasyGameScreen } from "../../features/games/screens/fantasy-game/fantasy-game.screen";
import { BracketGameScreen } from "../../features/games/screens/bracket-game/bracket-game.screen";
import { PredictionsGameNavigator } from "./predictions-game.navigator";
import { UsersNavigator, UsersRootStackParamList } from "./users.navigator";
import { LeaguesNavigator } from "./leagues.navigator";
import { InvitationsScreen } from "../../features/games/screens/invitations/invitations.screen";
import { NavigatorScreenParams } from "@react-navigation/native";

export type GamesRootStackParamList = {
  GamesMain: undefined;
  FantasyGame: undefined;
  BracketGame: undefined;
  PredictGame: undefined;
  Users: NavigatorScreenParams<UsersRootStackParamList>;
  Leagues: undefined;
  Invitations: undefined;
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
      options={({}) => ({ headerShown: false })}
      name="PredictGame"
      component={PredictionsGameNavigator}
    />
    <Stack.Screen
      options={({}) => ({ headerShown: false })}
      name="Users"
      component={UsersNavigator}
    />
    <Stack.Screen
      options={({}) => ({ headerShown: false })}
      name="Leagues"
      component={LeaguesNavigator}
    />
    <Stack.Screen
      options={({}) => ({ title: "Invitations" })}
      name="Invitations"
      component={InvitationsScreen}
    />
  </Stack.Navigator>
);
