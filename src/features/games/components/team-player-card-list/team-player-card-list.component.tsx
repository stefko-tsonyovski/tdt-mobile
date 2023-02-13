import { useAtom } from "jotai";
import React, { useContext } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  PlayerInTeam,
  usePlayersInTeam,
} from "../../../../services/players/players.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { AddPlayerCard } from "../add-player-card/add-player-card.component";
import { TeamPlayerCard } from "../team-player-card/team-player-card.component";

const countOfCards = [1, 2, 3, 4, 5, 6, 7, 8];

export const TeamPlayerCardList = () => {
  const { user } = useContext(AuthenticationContext);

  const [selectedWeek] = useAtom(selectedWeekAtom);
  const { data: playersData, isLoading: isLoadingPlayers } = usePlayersInTeam(
    { selected: selectedWeek },
    user.email
  );

  if (isLoadingPlayers) {
    return <Text variant="body">Loading...</Text>;
  }

  return (
    <Spacer position="left" size="large">
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {countOfCards.map((item) => {
          return Number(playersData?.players.length) >= item ? (
            <Spacer
              key={playersData?.players[item - 1].id}
              position="right"
              size="large"
            >
              <Spacer position="top" size="large">
                <View>
                  <TeamPlayerCard
                    player={playersData?.players[item - 1] as PlayerInTeam}
                    index={item}
                  />
                </View>
              </Spacer>
            </Spacer>
          ) : (
            <Spacer key={item} position="right" size="large">
              <Spacer position="top" size="large">
                <View>
                  <AddPlayerCard />
                </View>
              </Spacer>
            </Spacer>
          );
        })}
      </View>
    </Spacer>
  );
};
