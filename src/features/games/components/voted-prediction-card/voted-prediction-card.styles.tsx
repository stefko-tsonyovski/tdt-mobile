import { View } from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const PredictionCardContainer = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 10px;
`;

export const PredictionCardHeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const PredictionCardAvatarText = styled(Avatar.Text)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const PredictionCardText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const PredictionCardActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const PredictionCardFAB = styled(FAB)`
  background-color: ${(props) => props.theme.colors.text.inverse};
`;
