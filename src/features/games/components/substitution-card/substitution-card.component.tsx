import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PlayersVerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  PerformSubstitutionInputModel,
  Player,
  PlayerInTeam,
  useAddPlayerToTeam,
  useDeletePlayerFromTeam,
  usePerformSubstitution,
  usePlayersInTeam,
} from "../../../../services/players/players.service";
import { PLAYER_ITEM_HEIGHT } from "../../../../utils/constants";
import { Text } from "../../../../components/typography/text.component";
import {
  CardContainer,
  PlayerGeneralInfoContainer,
  PlayerImageContainer,
} from "../players-sidebar-card/players-sidebar-card.styles";
import { useAtom } from "jotai";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { ExchangePlayer } from "../exchange-player/exchange-player.component";

export type PlayersSidebarCardProps = {
  item: Player;
  players: PlayerInTeam[];
};

export const SubstitutionCard: FC<PlayersSidebarCardProps> = ({
  item,
  players,
}) => {
  const { user } = useContext(AuthenticationContext);
  const [selected] = useAtom(selectedWeekAtom);

  const { data: playersInTeamData } = usePlayersInTeam(
    {
      selected,
    },
    user.email
  );

  const { mutate: deletePlayerFromTeam, isLoading: isLoadingDelete } =
    useDeletePlayerFromTeam();
  const { mutate: performSubstitution } = usePerformSubstitution();

  const performSubstitutionHandler = (
    inputModel: PerformSubstitutionInputModel
  ) => {
    performSubstitution(inputModel);
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
        <Text variant="body">
          ATP {item.ranking} - {item.price / 1000000}M
        </Text>
      </PlayerGeneralInfoContainer>
      <PlayersVerticalDivider />
      <PlayerGeneralInfoContainer>
        <ExchangePlayer
          handler={performSubstitutionHandler}
          playersInTeam={playersInTeamData?.players as PlayerInTeam[]}
          substitutionId={item.id}
          substitutionName={item.name}
        />
        <IconButton
          onPress={deletePlayer}
          size={30}
          icon="minus-circle-outline"
          color={colors.ui.addPlayer}
        />
      </PlayerGeneralInfoContainer>
    </CardContainer>
  );
};
