import { View } from "react-native";
import { Button } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { CalculateTotal } from "../calculate-total/calculate-total.component";
import { CalculateWeekly } from "../calculate-weekly/calculate-weekly.component";
import { PlayersSidebar } from "../players-sidebar/players-sidebar.component";
import { SubstitutionList } from "../substitution-list/substitution-list.component";

export const ActionsContainer = () => {
  return (
    <View>
      <CalculateWeekly />
      <Spacer position="top" size="large">
        <PlayersSidebar />
      </Spacer>
      <Spacer position="top" size="large">
        <SubstitutionList />
      </Spacer>
      <Spacer position="top" size="large">
        <CalculateTotal />
      </Spacer>
    </View>
  );
};
