import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { VerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { LeagueInvitationsList } from "../../components/league-invitations-list/league-invitations-list.component";
import {
  ButtonsContainer,
  GrowIconButton,
} from "../../components/menu/menu.styles";

export const LeagueInvitationsScreen = () => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();

  return (
    <FantasyGameScreenContainer>
      <ScrollView showsVerticalScrollIndicator>
        <ButtonsContainer>
          <GrowIconButton
            onPress={() => navigation.navigate("Leagues")}
            color={colors.text.inverse}
            icon="account-group-outline"
          />
          <VerticalDivider />
          <GrowIconButton
            onPress={() => navigation.navigate("Users")}
            color={colors.text.inverse}
            icon="trophy-outline"
          />
          <VerticalDivider />
          <GrowIconButton
            onPress={() => navigation.navigate("Invitations")}
            color={colors.text.inverse}
            icon="lan-disconnect"
          />
        </ButtonsContainer>

        <Spacer position="top" size="large">
          <View></View>
        </Spacer>

        <LeagueInvitationsList />
      </ScrollView>
    </FantasyGameScreenContainer>
  );
};
