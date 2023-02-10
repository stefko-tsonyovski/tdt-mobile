import { Divider } from "react-native-paper";
import styled from "styled-components/native";

export const VerticalDivider = styled(Divider)`
  width: 2px;
  background-color: ${(props) => props.theme.colors.text.inverse};
  margin: 0 10px;
  height: 15px;
`;
