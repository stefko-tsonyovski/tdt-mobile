import React, { FC } from "react";
import { Avatar } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { useSinglePlayer } from "../../../../services/players/players.service";
import { styles } from "../../../../utils/styles";
import {
  AvatarImageContainer,
  PlayerMatchCardContainer,
} from "./player-match-card.styles";

type PlayerMatchCardProps = {
  playerId: number;
};

export const PlayerMatchCard: FC<PlayerMatchCardProps> = ({ playerId }) => {
  const { data, isLoading } = useSinglePlayer(playerId);

  return (
    <>
      {!isLoading && data ? (
        <PlayerMatchCardContainer>
          <AvatarImageContainer>
            <Avatar.Image
              style={{ backgroundColor: "white" }}
              size={75}
              source={{ uri: data.player.imageUrl }}
            />
          </AvatarImageContainer>

          <Text variant="body">{data.player.name}</Text>
          <Text variant="caption">({data.player.country})</Text>
          <Text style={styles.darkLightTextColor} variant="caption">
            {data.player.gender === "male"
              ? `ATP: ${data.player.ranking}`
              : `WTA: ${data.player.ranking}`}
          </Text>
        </PlayerMatchCardContainer>
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
