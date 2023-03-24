import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Banner } from "../../../../components/banner/banner.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { VerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { LeaguesRootStackParamList } from "../../../../infrastructure/navigation/leagues.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import {
  ButtonsContainer,
  GrowIconButton,
} from "../../components/menu/menu.styles";
import { RequestList } from "../../components/request-list/request-list.component";

export const RequestsScreen = () => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();
  const route = useRoute<RouteProp<LeaguesRootStackParamList>>();

  return (
    <FantasyGameScreenContainer>
      <ScrollView showsVerticalScrollIndicator>
        <Banner />
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

        <RequestList leagueId={route.params?.leagueId as string} />
      </ScrollView>
    </FantasyGameScreenContainer>
  );
};
