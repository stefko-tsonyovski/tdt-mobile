import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCalculateTotal } from "../../../../services/picks/picks.service";
import Spinner from "react-native-loading-spinner-overlay";

export const CalculateTotalBracket = () => {
  const { user } = useContext(AuthenticationContext);

  const { mutate: calculateTotal, isLoading } = useCalculateTotal();
  const calculateTotalHandler = () => calculateTotal(user.email);

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
      onPress={calculateTotalHandler}
      mode="contained"
      color={colors.bg.secondary}
    >
      Update total bracket points
    </Button>
  );
};
