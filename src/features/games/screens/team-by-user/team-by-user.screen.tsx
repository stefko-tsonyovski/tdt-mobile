import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { UsersRootStackParamList } from "../../../../infrastructure/navigation/users.navigator";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { WeeksMenu } from "../../components/menu/menu.component";
import { TeamByUserPlayerCardList } from "../../components/team-by-user-player-card-list/team-by-user-player-card-list.component";
import { TeamByUserPointsContainer } from "../../components/team-by-user-points-container/team-by-user-points-container.component";

export const TeamByUser = () => {
  const route = useRoute<RouteProp<UsersRootStackParamList>>();

  return (
    <FantasyGameScreenContainer>
      <ScrollView showsVerticalScrollIndicator>
        <WeeksMenu />

        <Spacer position="top" size="xl">
          <View></View>
        </Spacer>

        <TeamByUserPointsContainer userId={route.params?.userId as string} />
        <TeamByUserPlayerCardList userId={route.params?.userId as string} />
      </ScrollView>
    </FantasyGameScreenContainer>
  );
};
