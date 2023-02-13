import { useAtom } from "jotai";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { isPlayersSidebarOpenAtom } from "../../../../utils/atoms";
import {
  AddButtonContainer,
  AddPlayerCardContainer,
} from "./add-player-card.styles";

export const AddPlayerCard = () => {
  const [, setIsPlayersSidebarOpen] = useAtom(isPlayersSidebarOpenAtom);

  return (
    <AddPlayerCardContainer>
      <AddButtonContainer>
        <IconButton
          onPress={() => setIsPlayersSidebarOpen(true)}
          size={40}
          icon="plus-circle-outline"
          color={colors.ui.addPlayer}
        />
      </AddButtonContainer>
    </AddPlayerCardContainer>
  );
};
