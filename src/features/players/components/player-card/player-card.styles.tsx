import styled from "styled-components/native";
import { View } from "react-native";

export const HeadingBarContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
`;
