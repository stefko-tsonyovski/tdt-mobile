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
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        options={({}) => ({ title: "Tournaments" })}
        name="AllTournaments"
        component={TournamentsScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Tournament Details" })}
        name="TournamentDetails"
        component={TournamentDetailsScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Tournament Matches" })}
        name="SingleTournamentMatches"
        component={SingleTournamentMatchesScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Match Details" })}
        name="MatchDetails"
        component={MatchDetailsScreen}
      />
    </Stack.Navigator>
  );
};
