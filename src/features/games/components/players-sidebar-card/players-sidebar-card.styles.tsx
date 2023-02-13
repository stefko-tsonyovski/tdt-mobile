import { View } from "react-native";
import styled from "styled-components/native";
import { PLAYER_ITEM_HEIGHT } from "../../../../utils/constants";

export const CardContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${PLAYER_ITEM_HEIGHT}px;
  background-color: ${(props) => props.theme.colors.text.inverse};
  margin-top: 5px;
`;

export const PlayerImageContainer = styled(View)`
  flex-grow: 1;
  justify-content: center;
`;

export const PlayerGeneralInfoContainer = styled(View)`
  flex-grow: 1;
  align-items: center;
`;
