import { View } from "react-native";
import { Button } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { PlayersSidebar } from "../players-sidebar/players-sidebar.component";

export const ActionsContainer = () => {
  return (
    <View>
      <Button mode="contained" color={colors.bg.secondary}>
        Update weekly
      </Button>
      <Spacer position="top" size="large">
        <PlayersSidebar />
      </Spacer>
      <Spacer position="top" size="large">
        <Button mode="contained" color={colors.bg.secondary}>
          View all substitutions
        </Button>
      </Spacer>
      <Spacer position="top" size="large">
        <Button mode="contained" color={colors.bg.secondary}>
          Update total
        </Button>
      </Spacer>
    </View>
  );
};
