import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeArea } from "../../components/utility/safe-area.component";
import TournamentsScreen from "../../features/tournaments/screeens/tournaments.screen";

export type TournamentsRootStackParamList = {
  AllTournaments: undefined;
  TournamentDetail: undefined;
};

const Stack = createStackNavigator<TournamentsRootStackParamList>();

export const TournamentsNavigator = () => {
  return (
    <SafeArea>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AllTournaments" component={TournamentsScreen} />
        {/* <Stack.Screen name="TournamentDetail" component={} /> */}
      </Stack.Navigator>
    </SafeArea>
  );
};
