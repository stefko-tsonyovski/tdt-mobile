import { useAtom } from "jotai";
import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  PlayerInTeam,
  useAddBallToPlayer,
  useDeleteBallFromPlayer,
} from "../../../../services/players/players.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import {
  Multiplier,
  MultiplierContainer,
  MultiplierText,
  TeamPlayerBallsContainer,
} from "./team-player-balls.styles";

export type TeamPlayerBallsProps = {
  player: PlayerInTeam;
};

const ballsPerPlayer = [1, 2, 3];

export const TeamPlayerBalls: FC<TeamPlayerBallsProps> = ({ player }) => {
  const { user } = useContext(AuthenticationContext);
  const [selected] = useAtom(selectedWeekAtom);

  const { mutate: addBall } = useAddBallToPlayer();
  const { mutate: deleteBall } = useDeleteBallFromPlayer();

  const addBallToPlayer = () => {
    addBall({ weekId: selected.value, playerId: player.id, email: user.email });
  };

  const deleteBallFromPlayer = () => {
    deleteBall({
      weekId: selected.value,
      playerId: player.id,
      email: user.email,
    });
  };

  return (
    <>
      <TeamPlayerBallsContainer>
        {ballsPerPlayer.map((item) => {
          return player.balls >= item ? (
            <IconButton
              key={item}
              icon="tennis-ball"
              color={colors.ui.activeTennisBall}
              onPress={deleteBallFromPlayer}
            />
          ) : (
            <IconButton
              key={item}
              icon="tennis-ball"
              color={colors.ui.unactiveTennisBall}
              onPress={addBallToPlayer}
            />
          );
        })}
      </TeamPlayerBallsContainer>
      <Spacer position="top" size="small">
        <MultiplierContainer>
          <Multiplier>
            <MultiplierText variant="body">X{player.balls}</MultiplierText>
          </Multiplier>
        </MultiplierContainer>
      </Spacer>
    </>
  );
};
