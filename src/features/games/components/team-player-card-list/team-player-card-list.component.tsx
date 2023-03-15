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
import { TeamPlayerCardListContainer } from "./team-player-card-list.styles";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../../../../infrastructure/theme/colors";

const countOfCards = [
  { id: "1cdscsd", value: 1 },
  { id: "2dsfsc", value: 2 },
  { id: "3fdtr", value: 3 },
  { id: "4vdfg", value: 4 },
  { id: "5dsvsdf", value: 5 },
  { id: "6fdg", value: 6 },
  { id: "7vfdgre", value: 7 },
  { id: "8dfgdfg", value: 8 },
];

export const TeamPlayerCardList = () => {
  const { user } = useContext(AuthenticationContext);

  const [selectedWeek] = useAtom(selectedWeekAtom);
  const { data: playersData, isLoading: isLoadingPlayers } = usePlayersInTeam(
    { selected: selectedWeek },
    user.email
  );

  if (isLoadingPlayers) {
    return (
      <Spinner
        visible={true}
        textContent={"This may take a while..."}
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <Spacer position="left" size="large">
      <TeamPlayerCardListContainer>
        {countOfCards.map((item) => {
          return Number(playersData?.players.length) >= item.value ? (
            <Spacer
              key={playersData?.players[item.value - 1].id}
              position="right"
              size="large"
            >
              <Spacer position="top" size="large">
                <View>
                  <TeamPlayerCard
                    player={
                      playersData?.players[item.value - 1] as PlayerInTeam
                    }
                    index={item.value}
                  />
                </View>
              </Spacer>
            </Spacer>
          ) : (
            <Spacer key={item.id} position="right" size="large">
              <Spacer position="top" size="large">
                <View>
                  <AddPlayerCard />
                </View>
              </Spacer>
            </Spacer>
          );
        })}
      </TeamPlayerCardListContainer>
    </Spacer>
  );
};
