import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useContext, useState, FC } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { LeaguesRootStackParamList } from "../../../../infrastructure/navigation/leagues.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  UpdateLeagueInputModel,
  useUpdateLeague,
} from "../../../../services/leagues/leagues.service";
import Spinner from "react-native-loading-spinner-overlay";

export type UpdateLeagueProps = {
  inputModel: UpdateLeagueInputModel;
};

export const UpdateLeague: FC<UpdateLeagueProps> = ({ inputModel }) => {
  const navigation = useNavigation<NavigationProp<LeaguesRootStackParamList>>();

  const { user } = useContext(AuthenticationContext);
  const { mutate: updateLeague, isLoading } = useUpdateLeague();

  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(inputModel.name);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    const league = {
      ...inputModel,
      name,
      email: user.email,
    };

    updateLeague(league);
    hideDialog();

    navigation.setOptions({ title: name });
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
      <Button onPress={showDialog} mode="contained" color={colors.bg.primary}>
        UPDATE LEAGUE
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Update {inputModel.name}</Dialog.Title>
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
              UPDATE
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
