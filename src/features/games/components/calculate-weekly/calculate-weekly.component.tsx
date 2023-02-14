import { useAtom } from "jotai";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCalculateWeekly } from "../../../../services/players/players.service";
import { selectedWeekAtom } from "../../../../utils/atoms";

export const CalculateWeekly = () => {
  const { user } = useContext(AuthenticationContext);
  const [selected] = useAtom(selectedWeekAtom);

  const { mutate: calculateWeekly } = useCalculateWeekly();

  const calculateWeeklyHandler = () =>
    calculateWeekly({ weekId: selected.value, email: user.email });

  return (
    <Button
      onPress={calculateWeeklyHandler}
      mode="contained"
      color={colors.bg.secondary}
    >
      Update weekly
    </Button>
  );
};
