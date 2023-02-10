import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import { NativeMenu } from "../../../../components/native-menu/native-menu.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { VerticalDivider } from "../../../../components/vertical-divider/vertical-divider.styles";
import { colors } from "../../../../infrastructure/theme/colors";
import { ButtonsContainer, GrowIconButton } from "./menu.styles";

export const WeeksMenu = () => {
  return (
    <View style={{ backgroundColor: colors.bg.secondary }}>
      <ButtonsContainer>
        <GrowIconButton
          color={colors.text.inverse}
          icon="account-group-outline"
        />
        <VerticalDivider />
        <GrowIconButton color={colors.text.inverse} icon="trophy-outline" />
        <VerticalDivider />
        <GrowIconButton color={colors.text.inverse} icon="lan-disconnect" />
      </ButtonsContainer>
      <Spacer position="top" size="medium">
        <Divider style={{ backgroundColor: colors.text.inverse, height: 3 }} />
      </Spacer>
      <Spacer position="top" size="medium">
        <View></View>
      </Spacer>
      <Spacer position="bottom" size="medium">
        <NativeMenu />
      </Spacer>
    </View>
  );
};
