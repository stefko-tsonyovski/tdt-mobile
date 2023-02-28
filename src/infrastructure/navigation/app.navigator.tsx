import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GamesScreen } from "../../features/games/screens/games.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { colors } from "../theme/colors";
import { GamesNavigator } from "./games.navigator";
import { TournamentsNavigator } from "./tournaments.navigator";
import { RankListNavigator } from "./rank-list.navigator";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Games") {
            return (
              <Ionicons
                name="ios-game-controller-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Settings") {
            return <Ionicons name="settings" size={size} color={color} />;
          } else if (route.name === "Tournaments") {
            return <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === "RankList") {
            return <Ionicons name="trophy" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: colors.bg.secondary,
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg.primary,
        },
      })}
    >
      <Tab.Screen name="Tournaments" component={TournamentsNavigator} />
      <Tab.Screen name="Games" component={GamesNavigator} />
      <Tab.Screen name="RankList" component={RankListNavigator} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
