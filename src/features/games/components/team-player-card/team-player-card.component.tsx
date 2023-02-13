import { Text } from "../../../../components/typography/text.component";
import { PlayerInTeam } from "../../../../services/players/players.service";
import { FC } from "react";

export type TeamPlayerCardProps = {
  player: PlayerInTeam;
  index: number;
};

export const TeamPlayerCard: FC<TeamPlayerCardProps> = ({ player, index }) => {
  return <Text variant="body">Player</Text>;
};
