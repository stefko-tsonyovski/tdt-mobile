import React, { useContext, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
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
import { TextInput } from "react-native-paper";
import { Button, View } from "react-native";
import { useSendInvitation } from "../../../../services/invitations/invitations.service";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";

export const InvitationsScreen = () => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();
  const { user } = useContext(AuthenticationContext);
  const [receiverEmail, setReceiverEmail] = useState("");
  const { mutate: sendInvitation } = useSendInvitation();

  const handleSend = () => {
    console.log(receiverEmail);

    const sendInvitationInputModel = {
      receiverEmail,
      senderEmail: user?.email,
    };

    sendInvitation(sendInvitationInputModel);
  };

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
        <View>
          <Text textAlign="center">INVITE OTHERS</Text>
        </View>
      </Spacer>
      <Spacer position="top" size="large">
        <TextInput
          label="Email"
          value={receiverEmail}
          onChangeText={setReceiverEmail}
        />
      </Spacer>
      <Spacer position="top" size="large">
        <Button title="Send" color={colors.bg.primary} onPress={handleSend} />
      </Spacer>
    </FantasyGameScreenContainer>
  );
};
