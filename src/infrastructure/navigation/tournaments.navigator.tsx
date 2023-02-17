import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeArea } from "../../components/utility/safe-area.component";
import { TournamentsScreen } from "../../features/tournaments/screens/tournaments.screen";
import { TournamentDetailsScreen } from "../../features/tournaments/screens/tournament-details.screen";

export type TournamentsRootStackParamList = {
  AllTournaments: undefined;
  TournamentDetails: { tournamentId: number };
};

const Stack = createStackNavigator<TournamentsRootStackParamList>();

export const TournamentsNavigator = () => {
  return (
    <SafeArea>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="AllTournaments" component={TournamentsScreen} />
        <Stack.Screen
          name="TournamentDetails"
          component={TournamentDetailsScreen}
        />
      </Stack.Navigator>
    </SafeArea>
  );
};
