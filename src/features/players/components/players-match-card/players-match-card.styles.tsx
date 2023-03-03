import { View } from "react-native";
import { Colors } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const PlayersCardContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${Colors.grey300};
  padding: ${(props) => props.theme.space[3]};
`;

export const TextDate = styled(Text)`
  text-align: center;
  font-weight: bold;
  font-family: monospace;
  color: ${Colors.grey500};
`;

export const TextSets = styled(Text)`
  text-align: center;
  font-weight: bold;
  font-size: 50px;
`;

export const TextStatus = styled(Text)`
  text-align: center;
  font-weight: bold;
`;
