import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GamesScreen } from "../../features/games/screens/games.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Games") {
            return (
              <Ionicons name="game-controller" size={size} color={color} />
            );
          } else if (route.name === "Settings") {
            return <Ionicons name="settings" size={size} color={color} />;
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
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
