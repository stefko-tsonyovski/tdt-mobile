import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCalculateTotal } from "../../../../services/players/players.service";

export const CalculateTotal = () => {
  const { user } = useContext(AuthenticationContext);

  const { mutate: calculateTotal, isLoading } = useCalculateTotal();
  const calculateTotalHandler = () => calculateTotal(user.email);

  return (
    <Button
      onPress={calculateTotalHandler}
      mode="contained"
      color={colors.bg.secondary}
    >
      Update total
    </Button>
  );
};
