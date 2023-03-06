import { StyleSheet } from "react-native";
import { Colors } from "react-native-paper";
import { colors } from "../infrastructure/theme/colors";

export const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: colors.text.shadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  darkLightTextColor: {
    color: Colors.grey500,
  },
});
