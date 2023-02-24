import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LeaguesScreen } from "../../features/games/screens/leagues/leagues.screen";
import { LeagueDetailsScreen } from "../../features/games/screens/league-details/league-details.screen";
import { RequestsScreen } from "../../features/games/screens/requests/requests.screen";
import { LeagueInvitationsScreen } from "../../features/games/screens/league-invitations/league-invitations.screen";

export type LeaguesRootStackParamList = {
  LeaguesMain: undefined;
  LeagueDetails: { leagueId: string; title: string };
  Requests: { leagueId: string; title: string };
  LeagueInvitations: undefined;
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
      <Stack.Screen
        options={({ route }) => ({ title: route.params.title })}
        name="LeagueDetails"
        component={LeagueDetailsScreen}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.title + `'s Requests` })}
        name="Requests"
        component={RequestsScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Your Invitations" })}
        name="LeagueInvitations"
        component={LeagueInvitationsScreen}
      />
    </Stack.Navigator>
  );
};
