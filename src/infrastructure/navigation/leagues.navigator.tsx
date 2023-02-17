import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UsersScreen } from "../../features/games/screens/users/users.screen";
import { LeaguesScreen } from "../../features/games/screens/leagues/leagues.screen";

export type LeaguesRootStackParamList = {
  LeaguesMain: undefined;
};

const Stack = createStackNavigator<LeaguesRootStackParamList>();

export const LeaguesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Stack.Screen
        options={({}) => ({ title: "Leagues" })}
        name="LeaguesMain"
        component={LeaguesScreen}
      />
    </Stack.Navigator>
  );
};
