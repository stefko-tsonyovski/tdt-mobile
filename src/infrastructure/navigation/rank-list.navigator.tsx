import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { AllPlayers } from "../../features/players/screens/all-players/all-players.screen";
import { PlayerDetailsScreen } from "../../features/players/screens/player-details/player-details.screen";

export type RankListRootStackParamList = {
  AllPlayers: undefined;
  PlayerDetails: { playerId: number };
};

const Stack = createStackNavigator<RankListRootStackParamList>();

export const RankListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        options={({}) => ({ title: "Rank List" })}
        name="AllPlayers"
        component={AllPlayers}
      />
      <Stack.Screen
        options={({}) => ({ title: "Player Details" })}
        name="PlayerDetails"
        component={PlayerDetailsScreen}
      />
    </Stack.Navigator>
  );
};
