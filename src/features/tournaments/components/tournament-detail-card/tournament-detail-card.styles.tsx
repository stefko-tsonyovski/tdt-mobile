import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const DetailCard = styled(Card)`
  elevation: 0;
  background-color: ${(props) => props.theme.colors.ui.card};
`;
