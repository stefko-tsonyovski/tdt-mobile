import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const TeamPlayerBallsContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const MultiplierContainer = styled(View)`
  align-items: center;
  margin: auto;
`;

export const Multiplier = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 75px;
  border-radius: 5px;
`;

export const MultiplierText = styled(Text)`
  text-align: center;
  color: ${(props) => props.theme.colors.text.inverse};
`;
