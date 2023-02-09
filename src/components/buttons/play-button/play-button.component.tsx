import { Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../typography/text.component";
import { MaxWidthButton } from "../max-width-button/max-width-button.styles";

export const PlayButton = () => {
  return (
    <MaxWidthButton mode="contained" color={colors.bg.primary}>
      <Text variant="inverse">PLAY</Text>
    </MaxWidthButton>
  );
};
