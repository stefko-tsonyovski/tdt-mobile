import React, { useState, useContext, FC } from "react";

import { ActivityIndicator, Colors } from "react-native-paper";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountRootStackParamList } from "../../../infrastructure/navigation/account.navigator";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
  NamesContainer,
  NameInput,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { View } from "react-native";

export type RegisterScreenProps = NativeStackScreenProps<
  AccountRootStackParamList,
  "Register"
>;

export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <AccountContainer>
        <Title variant="body">Tennis Dream Team</Title>
        <Spacer position="top" size="large">
          <View></View>
        </Spacer>
        <NamesContainer>
          <NameInput
            label="First Name"
            value={firstName}
            autoCapitalize="none"
            onChangeText={(u) => setFirstName(u)}
          />
          <Spacer position="right" size="small" children={undefined} />
          <NameInput
            label="Last Name"
            value={lastName}
            autoCapitalize="none"
            onChangeText={(u) => setLastName(u)}
          />
        </NamesContainer>
        <Spacer position="top" size="large">
          <AuthInput
            label="E-mail"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer position="top" size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer position="top" size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() =>
                onRegister(
                  firstName,
                  lastName,
                  email,
                  password,
                  repeatedPassword
                )
              }
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer position="top" size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
