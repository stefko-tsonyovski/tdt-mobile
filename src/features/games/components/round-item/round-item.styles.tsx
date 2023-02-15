import { Chip } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../../../infrastructure/theme/colors";

export const RoundItemChip = styled(Chip).attrs({
  textStyle: { color: colors.text.inverse },
})`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[1]};
`;
