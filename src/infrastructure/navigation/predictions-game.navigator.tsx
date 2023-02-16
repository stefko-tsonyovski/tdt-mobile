import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PredictionsGameScreen } from "../../features/games/screens/prediction-game/predictions-game.screen";
import { YourVotesScreen } from "../../features/games/screens/your-votes/your-votes.screen";
import { AddPredictionScreen } from "../../features/games/screens/add-prediction/add-prediction.screen";

export type PredictionsGameRootStackParamList = {
  PredictionsMain: undefined;
  YourVotes: undefined;
  AddPrediction: undefined;
};

const Stack = createStackNavigator<PredictionsGameRootStackParamList>();

export const PredictionsGameNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#FFF" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="PredictionsMain" component={PredictionsGameScreen} />
      <Stack.Screen name="YourVotes" component={YourVotesScreen} />
      <Stack.Screen name="AddPrediction" component={AddPredictionScreen} />
    </Stack.Navigator>
  );
};
