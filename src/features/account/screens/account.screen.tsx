import React, { FC } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AccountRootStackParamList } from "../../../infrastructure/navigation/account.navigator";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";
import { View } from "react-native";

export type AccountScreenProps = NativeStackScreenProps<
  AccountRootStackParamList,
  "Main"
>;

export const AccountScreen: FC<AccountScreenProps> = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper></AnimationWrapper>

      <AccountContainer>
        <Title variant="body">Tennis Dream Team</Title>
        <Spacer position="top" size="large">
          <View></View>
        </Spacer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer position="top" size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
