import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";

export type TournamentsRootStackParamList = {
  Tournaments: undefined;
  TournamentDetail: undefined;
};

const Stack = createStackNavigator<TournamentsRootStackParamList>();

const TournamentsScreen = () => {
  return (
    <SafeArea>
      <Text variant="body"> Tournaments </Text>
    </SafeArea>
  );
};

export default TournamentsScreen;
