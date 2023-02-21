import { useAtom } from "jotai";
import React from "react";
import { FC } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { PlayerInTeam } from "../../../../services/players/players.service";
import { useTeamByUserAndByWeek } from "../../../../services/users/users.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { AddPlayerCard } from "../add-player-card/add-player-card.component";
import { TeamPlayerCardListContainer } from "../team-player-card-list/team-player-card-list.styles";
import { TeamPlayerCard } from "../team-player-card/team-player-card.component";

export type TeamByUserPlayerCardListProps = {
  userId: string;
};

const countOfCards = [1, 2, 3, 4, 5, 6, 7, 8];

export const TeamByUserPlayerCardList: FC<TeamByUserPlayerCardListProps> = ({
  userId,
}) => {
  const [selected] = useAtom(selectedWeekAtom);
  const { data: playersData, isLoading: isLoadingPlayers } =
    useTeamByUserAndByWeek(userId, selected.value);

  return (
    <>
      {isLoadingPlayers ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <Spacer position="left" size="large">
            <TeamPlayerCardListContainer>
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
                          disabled
                          player={
                            playersData?.players[item - 1] as PlayerInTeam
                          }
                          index={item}
                        />
                      </View>
                    </Spacer>
                  </Spacer>
                ) : (
                  <Spacer key={item} position="right" size="large">
                    <Spacer position="top" size="large">
                      <View>
                        <AddPlayerCard disabled />
                      </View>
                    </Spacer>
                  </Spacer>
                );
              })}
            </TeamPlayerCardListContainer>
          </Spacer>
        </>
      )}
    </>
  );
};
