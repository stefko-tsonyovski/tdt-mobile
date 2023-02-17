import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PredictionsGameScreen } from "../../features/games/screens/prediction-game/predictions-game.screen";
import { YourVotesScreen } from "../../features/games/screens/your-votes/your-votes.screen";
import { AddPredictionScreen } from "../../features/games/screens/add-prediction/add-prediction.screen";
import { PredictionsWithoutAnswerScreen } from "../../features/games/screens/predictions-without-answer/predictions-without-answer.screen";

export type PredictionsGameRootStackParamList = {
  PredictionsMain: undefined;
  YourVotes: undefined;
  AddPrediction: undefined;
  PredictionsWithoutAnswer: undefined;
};

const Stack = createStackNavigator<PredictionsGameRootStackParamList>();

export const PredictionsGameNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Stack.Screen
        options={({}) => ({ title: "Predict" })}
        name="PredictionsMain"
        component={PredictionsGameScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Your Votes" })}
        name="YourVotes"
        component={YourVotesScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Add Prediction" })}
        name="AddPrediction"
        component={AddPredictionScreen}
      />
      <Stack.Screen
        options={({}) => ({ title: "Without Answer" })}
        name="PredictionsWithoutAnswer"
        component={PredictionsWithoutAnswerScreen}
      />
    </Stack.Navigator>
  );
};
