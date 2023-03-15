import React, { FC } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Avatar } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { useSinglePlayer } from "../../../../services/players/players.service";
import { styles } from "../../../../utils/styles";
import {
  AvatarImageContainer,
  PlayerMatchCardContainer,
  TextPlayerNameLoser,
  TextPlayerNameWinner,
} from "./player-match-card.styles";

type PlayerMatchCardProps = {
  playerId: number;
  winnerId: number;
};

export const PlayerMatchCard: FC<PlayerMatchCardProps> = ({
  playerId,
  winnerId,
}) => {
  const { data, isLoading } = useSinglePlayer(playerId);

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <PlayerMatchCardContainer>
      <AvatarImageContainer>
        <Avatar.Image
          style={{ backgroundColor: "white" }}
          size={75}
          source={{ uri: data.player.imageUrl }}
        />
      </AvatarImageContainer>

      {winnerId === playerId ? (
        <TextPlayerNameWinner textAlign="center">
          {data.player.name} ({data.player.country})
        </TextPlayerNameWinner>
      ) : (
        <TextPlayerNameLoser textAlign="center">
          {data.player.name} ({data.player.country})
        </TextPlayerNameLoser>
      )}

      <Text style={styles.darkLightTextColor} variant="caption">
        {data.player.gender === "male"
          ? `ATP: ${data.player.ranking}`
          : `WTA: ${data.player.ranking}`}
      </Text>
    </PlayerMatchCardContainer>
  );
};
