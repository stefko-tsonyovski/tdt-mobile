import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext, useState, FC } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  UpdateLeagueInputModel,
  useDeleteLeague,
  useLeaveLeague,
} from "../../../../services/leagues/leagues.service";
import Spinner from "react-native-loading-spinner-overlay";

export type DeleteLeagueProps = {
  inputModel: UpdateLeagueInputModel;
};

export const LeaveLeague: FC<DeleteLeagueProps> = ({ inputModel }) => {
  const navigation = useNavigation<NavigationProp<GamesRootStackParamList>>();

  const { user } = useContext(AuthenticationContext);
  const { mutate: leaveLeague, isLoading } = useLeaveLeague();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    const league = {
      leagueId: inputModel._id,
      email: user.email,
    };

    leaveLeague(league);
    hideDialog();

    navigation.goBack();
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
        LEAVE LEAGUE
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Leave {inputModel.name}?</Dialog.Title>
          <Dialog.Content>
            <Spacer position="top" size="large">
              <Text variant="body">
                You are going to leave {inputModel.name}. Are you sure you want
                to proceed?
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
