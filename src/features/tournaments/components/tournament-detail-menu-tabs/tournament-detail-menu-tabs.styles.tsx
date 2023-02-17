import { View } from "react-native";
import { Button, Colors } from "react-native-paper";
import styled from "styled-components/native";

export const TabsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const MenuTabsContainer = styled.View`
  flex: 0.1;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-color: #bac0be;
  border-bottom-width: 1px;
`;

export const Tab = styled.View`
  border-bottom-color: #bac0be;
  border-bottom-width: 2px;
`;

export const ActiveTab = styled.View`
  border-bottom-color: ${Colors.blue500};
  border-bottom-width: 2px;
`;

export const TabPanelContainer = styled.View`
  flex: 0.9;
  width: 100%;
`;

export const TabContentContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;
