import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { VerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { LeaguesRootStackParamList } from "../../../../infrastructure/navigation/leagues.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  UpdateLeagueInputModel,
  useSingleLeague,
} from "../../../../services/leagues/leagues.service";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { LeagueDetails } from "../../components/league-details/league-details.component";
import {
  ButtonsContainer,
  GrowIconButton,
} from "../../components/menu/menu.styles";

export const LeagueDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();
  const route = useRoute<RouteProp<LeaguesRootStackParamList>>();

  const { data: leagueData, isLoading: isLoadingLeague } = useSingleLeague(
    route.params?.leagueId as string
  );

  return (
    <FantasyGameScreenContainer>
      {isLoadingLeague ? (
        <Text variant="body">Loading...</Text>
      ) : (
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

          <LeagueDetails league={leagueData as UpdateLeagueInputModel} />
        </ScrollView>
      )}
    </FantasyGameScreenContainer>
  );
};