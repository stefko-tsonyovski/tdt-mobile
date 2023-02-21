import { View } from "react-native";
import styled from "styled-components/native";

export const PlayerMatchCardContainer = styled.View`
  align-items: center;
`;

export const AvatarImageContainer = styled(View)`
  background-color: white;
  border-radius: 10px;
  padding: ${(props) => props.theme.space[0]};
`;
