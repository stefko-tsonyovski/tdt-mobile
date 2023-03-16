import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { VerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import {
  ButtonsContainer,
  GrowIconButton,
} from "../../components/menu/menu.styles";

export const InvitationsScreen = () => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();

  return (
    <FantasyGameScreenContainer>
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
        <Text
          style={{
            textAlign: "center",
            color: colors.bg.primary,
            fontSize: 18,
          }}
          variant="body"
        >
          COMING SOON!
        </Text>
      </Spacer>
    </FantasyGameScreenContainer>
  );
};
