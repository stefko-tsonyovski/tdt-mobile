import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState, FC } from "react";
import { View } from "react-native";
import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  UpdateLeagueInputModel,
  useDeleteLeague,
  useKickMember,
} from "../../../../services/leagues/leagues.service";
import { User } from "../../../../services/users/users.service";

export type KickMemberProps = {
  member: User;
  leagueId: string;
};

export const KickMember: FC<KickMemberProps> = ({ member, leagueId }) => {
  const { user } = useContext(AuthenticationContext);
  const { mutate: kickMember } = useKickMember();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    kickMember({ memberId: member._id, leagueId, email: user.email });
    hideDialog();
  };

  return (
    <View>
      <IconButton
        onPress={showDialog}
        icon="exit-run"
        color={colors.ui.error}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            Kick {member.firstName + " " + member.lastName}?
          </Dialog.Title>
          <Dialog.Content>
            <Spacer position="top" size="large">
              <Text variant="body">
                You are going to kick {member.firstName + " " + member.lastName}
                . Are you sure you want to proceed?
              </Text>
            </Spacer>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={colors.ui.predict} onPress={hideDialog}>
              CANCEL
            </Button>
            <Button color={colors.ui.error} onPress={handleSubmit}>
              PROCEED
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
