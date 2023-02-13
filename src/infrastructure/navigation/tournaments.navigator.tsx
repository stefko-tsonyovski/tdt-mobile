import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeArea } from "../../components/utility/safe-area.component";

export type TournamentsRootStackParamList = {
  Tournaments: undefined;
  TournamentDetail: undefined;
};

const Stack = createStackNavigator<TournamentsRootStackParamList>();

const TournamentsNavigator = () => {
  return (
    <SafeArea>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tournaments" component={} />
        <Stack.Screen name="TournamentDetail" component={} />
      </Stack.Navigator>
    </SafeArea>
  );
};

export default TournamentsNavigator;
