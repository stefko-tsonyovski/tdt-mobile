import { useAtom } from "jotai";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCalculateWeekly } from "../../../../services/players/players.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import Spinner from "react-native-loading-spinner-overlay";

export const CalculateWeekly = () => {
  const { user } = useContext(AuthenticationContext);
  const [selected] = useAtom(selectedWeekAtom);

  const { mutate: calculateWeekly, isLoading } = useCalculateWeekly();

  const calculateWeeklyHandler = () =>
    calculateWeekly({ weekId: selected.value, email: user.email });

  if (isLoading) {
    return (
      <Spinner
        visible={true}
        textContent={"This may take a while..."}
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

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
