import { Card, Colors } from "react-native-paper";
import styled from "styled-components/native";

export const DetailCard = styled(Card)`
  elevation: 0;
  background-color: ${(props) => Colors.grey300};
`;
