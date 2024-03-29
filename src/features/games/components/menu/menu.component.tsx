import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { NativeMenu } from "../../../../components/native-menu/native-menu.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { VerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  ButtonsContainer,
  GrowIconButton,
  MenuDivider,
  WeeksMenuContainer,
} from "./menu.styles";

export const WeeksMenu = () => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();

  return (
    <WeeksMenuContainer>
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
      <Spacer position="top" size="medium">
        <MenuDivider />
      </Spacer>
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <Spacer position="bottom" size="medium">
        <NativeMenu />
      </Spacer>
    </WeeksMenuContainer>
  );
};
