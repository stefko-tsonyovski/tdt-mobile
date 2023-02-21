import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeArea } from "../../components/utility/safe-area.component";
import { TournamentsScreen } from "../../features/tournaments/screens/tournamens/tournaments.screen";
import { TournamentDetailsScreen } from "../../features/tournaments/screens/tournament-details/tournament-details.screen";
import { SingleTournamentMatchesScreen } from "../../features/tournaments/screens/single-tournament-matches/single-tournament-matches.screen";
import { MatchDetailsScreen } from "../../features/matches/screens/match-details.tsx/match-details.screen";

export type TournamentsRootStackParamList = {
  AllTournaments: undefined;
  TournamentDetails: { tournamentId: number };
  SingleTournamentMatches: { tournamentId: number; date: string };
  MatchDetails: { matchId: number };
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
        <Stack.Screen
          name="SingleTournamentMatches"
          component={SingleTournamentMatchesScreen}
        />
        <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
      </Stack.Navigator>
    </SafeArea>
  );
};
