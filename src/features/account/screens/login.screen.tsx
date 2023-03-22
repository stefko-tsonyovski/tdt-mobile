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
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { View } from "react-native";
import { registerForPushNotificationsAsync } from "../../../../App";
import { useSubscribeForPushNotifications } from "../../../services/user-tokens/user-tokens.service";

export type LoginScreenProps = NativeStackScreenProps<
  AccountRootStackParamList,
  "Login"
>;

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const { user } = useContext(AuthenticationContext);
  const { mutate: subscribeForPushNotifications } =
    useSubscribeForPushNotifications();
  return (
    <AccountBackground>
      <AccountCover />
      <AccountContainer>
        <Title variant="body">Tennis Dream Team</Title>
        <Spacer position="top" size="large">
          <View></View>
        </Spacer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
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
        {error && (
          <ErrorContainer>
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer position="top" size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => {
                onLogin(email, password);

                registerForPushNotificationsAsync().then((token) => {
                  subscribeForPushNotifications({
                    email,
                    token: token as string,
                  });
                });
              }}
            >
              Login
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
