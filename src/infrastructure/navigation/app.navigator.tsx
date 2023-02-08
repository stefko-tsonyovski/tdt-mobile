import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { QuestionsScreen } from "../../features/questions/screens/questions.screen";
import { ArticlesScreen } from "../../features/articles/screens/articles.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Questions") {
            return <Ionicons name="list" size={size} color={color} />;
          } else if (route.name === "Articles") {
            return <Ionicons name="text" size={size} color={color} />;
          } else if (route.name === "Settings") {
            return <Ionicons name="settings" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Questions" component={QuestionsScreen} />
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
