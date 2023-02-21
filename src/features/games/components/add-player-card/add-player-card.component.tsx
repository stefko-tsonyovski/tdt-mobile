import { useAtom } from "jotai";
import React, { FC } from "react";
import { IconButton } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { isPlayersSidebarOpenAtom } from "../../../../utils/atoms";
import {
  AddButtonContainer,
  AddPlayerCardContainer,
} from "./add-player-card.styles";

export type AddPlayerCardProps = {
  disabled?: boolean;
};

export const AddPlayerCard: FC<AddPlayerCardProps> = ({ disabled }) => {
  const [, setIsPlayersSidebarOpen] = useAtom(isPlayersSidebarOpenAtom);

  return (
    <AddPlayerCardContainer>
      <AddButtonContainer>
        {disabled ? (
          <IconButton
            size={40}
            icon="plus-circle-outline"
            color={colors.ui.addPlayer}
          />
        ) : (
          <IconButton
            onPress={() => setIsPlayersSidebarOpen(true)}
            size={40}
            icon="plus-circle-outline"
            color={colors.ui.addPlayer}
          />
        )}
      </AddButtonContainer>
    </AddPlayerCardContainer>
  );
};
