import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCreateLeague } from "../../../../services/leagues/leagues.service";
import Spinner from "react-native-loading-spinner-overlay";

export const CreateLeague = () => {
  const { user } = useContext(AuthenticationContext);
  const { mutate: createLeague, isLoading } = useCreateLeague();

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    const league = {
      name,
      email: user.email,
    };

    createLeague(league);
    hideDialog();
  };

  if (isLoading) {
    return (
      <Spinner
        visible={true}
        textContent={"This may take a while..."}
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <View>
      <Button mode="contained" color={colors.bg.primary} onPress={showDialog}>
        CREATE LEAGUE
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>CREATE LEAGUE</Dialog.Title>
          <Dialog.Content>
            <Spacer position="top" size="large">
              <TextInput
                label="Name"
                value={name}
                onChangeText={(name) => setName(name)}
                mode="outlined"
              />
            </Spacer>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={colors.ui.predict} onPress={hideDialog}>
              CANCEL
            </Button>
            <Button color={colors.bg.primary} onPress={handleSubmit}>
              CREATE
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
