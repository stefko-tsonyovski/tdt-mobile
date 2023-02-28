import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { AllPlayers } from "../../features/players/screens/all-players.screen.tsx/all-players.screen";

export type RankListRootStackParamList = {
  AllPlayers: undefined;
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
      </Stack.Navigator>
    </SafeArea>
  );
};
