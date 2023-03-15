import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const PlayerMatchCardContainer = styled.View`
  align-items: center;
`;

export const AvatarImageContainer = styled(View)`
  background-color: white;
  border-radius: 10px;
  padding: ${(props) => props.theme.space[0]};
`;

export const TextPlayerNameWinner = styled(Text)`
  width: 80%;
  font-weight: 900;
`;

export const TextPlayerNameLoser = styled(Text)`
  width: 80%;
`;
