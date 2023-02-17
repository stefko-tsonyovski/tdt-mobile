import { View } from "react-native";
import styled from "styled-components/native";

export const Elevation = styled(View)`
  margin: ${(props) => props.theme.space[1]};
`;
