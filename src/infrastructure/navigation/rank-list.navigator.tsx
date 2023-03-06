import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { AllPlayers } from "../../features/players/screens/all-players/all-players.screen";
import { PlayerDetailsScreen } from "../../features/players/screens/player-details/player-details.screen";

export type RankListRootStackParamList = {
  AllPlayers: undefined;
  PlayerDetails: { id: string };
};

const Stack = createStackNavigator<RankListRootStackParamList>();

export const RankListNavigator = () => {
  return (
    <SafeArea>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="AllPlayers" component={AllPlayers} />
        <Stack.Screen name="PlayerDetails" component={PlayerDetailsScreen} />
      </Stack.Navigator>
    </SafeArea>
  );
};
