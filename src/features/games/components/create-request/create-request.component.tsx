import React, { useContext, useState, FC } from "react";
import { View } from "react-native";
import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { League } from "../../../../services/leagues/leagues.service";
import { useCreateRequest } from "../../../../services/requests/requests.service";

export type CreateRequestProps = {
  league: League;
};

export const CreateRequest: FC<CreateRequestProps> = ({ league }) => {
  const { user } = useContext(AuthenticationContext);
  const { mutate: createRequest } = useCreateRequest();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    createRequest({ leagueId: league._id, email: user.email });
    hideDialog();
  };

  return (
    <View>
      <IconButton
        onPress={showDialog}
        icon="door-open"
        color={colors.bg.primary}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Send request to {league.name}?</Dialog.Title>
          <Dialog.Content>
            <Spacer position="top" size="large">
              <Text variant="body">
                You are going to send request to {league.name}. Are you sure you
                want to proceed?
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
