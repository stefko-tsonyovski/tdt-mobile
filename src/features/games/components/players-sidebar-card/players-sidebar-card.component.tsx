import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PlayersVerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Player,
  PlayerInTeam,
  useAddPlayerToTeam,
  useDeletePlayerFromTeam,
} from "../../../../services/players/players.service";
import { PLAYER_ITEM_HEIGHT } from "../../../../utils/constants";
import { Text } from "../../../../components/typography/text.component";
import {
  CardContainer,
  PlayerGeneralInfoContainer,
  PlayerImageContainer,
} from "./players-sidebar-card.styles";
import { useAtom } from "jotai";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";

export type PlayersSidebarCardProps = {
  item: Player;
  players: PlayerInTeam[];
};

export const PlayersSidebarCard: FC<PlayersSidebarCardProps> = ({
  item,
  players,
}) => {
  const { user } = useContext(AuthenticationContext);
  const [selected] = useAtom(selectedWeekAtom);

  const { mutate: addPlayerToTeam, isLoading: isLoadingAdd } =
    useAddPlayerToTeam();
  const { mutate: deletePlayerFromTeam, isLoading: isLoadingDelete } =
    useDeletePlayerFromTeam();

  const isPlayerBought = () => {
    return players.some((p) => p.id === item.id);
  };

  const addPlayer = () => {
    const inputModel = {
      weekId: selected.value,
      playerId: item.id,
      email: user.email,
    };
    addPlayerToTeam(inputModel);
  };

  const deletePlayer = () => {
    const inputModel = {
      weekId: selected.value,
      playerId: item.id,
      email: user.email,
    };
    deletePlayerFromTeam(inputModel);
  };

  return (
    <CardContainer>
      <Spacer position="left" size="large">
        <PlayerImageContainer>
          <Avatar.Image size={50} source={{ uri: item.imageUrl }} />
        </PlayerImageContainer>
      </Spacer>
      <PlayerGeneralInfoContainer>
        <Text variant="body">{item.name}</Text>
        <Text variant="body">ATP {item.ranking}</Text>
      </PlayerGeneralInfoContainer>
      <PlayersVerticalDivider />
      <PlayerGeneralInfoContainer>
        <Text variant="body">{item.price / 1000000}M</Text>
        {isPlayerBought() ? (
          <IconButton
            onPress={deletePlayer}
            size={30}
            icon="minus-circle-outline"
            color={colors.ui.addPlayer}
          />
        ) : (
          <IconButton
            onPress={addPlayer}
            size={30}
            icon="plus-circle-outline"
            color={colors.bg.secondary}
          />
        )}
      </PlayerGeneralInfoContainer>
    </CardContainer>
  );
};
