import { View } from "react-native";
import { Card, Colors } from "react-native-paper";
import styled from "styled-components/native";

export const HeadingContainer = styled(View)`
  background-color: ${Colors.grey300};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.grey500};
`;

export const HeadingCardTitle = styled(Card.Title)`
  background-color: ${Colors.grey300};
`;
