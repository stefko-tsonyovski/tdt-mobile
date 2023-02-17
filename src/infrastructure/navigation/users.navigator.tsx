import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UsersScreen } from "../../features/games/screens/users/users.screen";

export type UsersRootStackParamList = {
  UsersMain: undefined;
};

const Stack = createStackNavigator<UsersRootStackParamList>();

export const UsersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Stack.Screen
        options={({}) => ({ title: "Users" })}
        name="UsersMain"
        component={UsersScreen}
      />
    </Stack.Navigator>
  );
};
