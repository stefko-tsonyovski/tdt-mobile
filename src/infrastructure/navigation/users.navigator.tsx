import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UsersScreen } from "../../features/games/screens/users/users.screen";
import { TeamByUser } from "../../features/games/screens/team-by-user/team-by-user.screen";

export type UsersRootStackParamList = {
  UsersMain: undefined;
  TeamByUser: { userId: string; title: string };
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
      <Stack.Screen
        options={({ route }) => ({ title: route.params.title + `'s Team` })}
        name="TeamByUser"
        component={TeamByUser}
      />
    </Stack.Navigator>
  );
};
