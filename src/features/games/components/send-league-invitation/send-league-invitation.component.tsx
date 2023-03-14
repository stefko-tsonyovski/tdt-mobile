import React, { useState, FC, useContext } from "react";
import { View } from "react-native";
import { IconButton, Button, Dialog, Portal } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import SelectDropdown from "react-native-select-dropdown";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { User, useTop200 } from "../../../../services/users/users.service";
import {
  CreateLeagueInvitationInputModel,
  useCreateLeagueInvitation,
} from "../../../../services/league-invitations/league-invitations.service";
import { UpdateLeagueInputModel } from "../../../../services/leagues/leagues.service";
import Spinner from "react-native-loading-spinner-overlay";

export type SendLeagueInvitationProps = {
  league: UpdateLeagueInputModel;
};

export const SendLeagueInvitation: FC<SendLeagueInvitationProps> = ({
  league,
}) => {
  const { user } = useContext(AuthenticationContext);

  const { data: usersData, isLoading: isLoadingUsers } = useTop200("", true);

  const {
    mutate: createLeagueInvitation,
    isLoading: isLoadingCreateLeagueInvitation,
  } = useCreateLeagueInvitation();

  const [visible, setVisible] = useState(false);
  const [userSearchValue, setUserSearchValue] = useState("");
  const [receiver, setReceiver] = useState("");

  const filteredUserSelectList = !usersData?.users
    ? []
    : usersData.users.filter((item) => {
        const { firstName, lastName } = item;
        const name = firstName + " " + lastName;

        return name.toLowerCase().includes(userSearchValue.toLowerCase());
      });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleCreateLeagueInvitation = () => {
    const inputModel = {
      leagueId: league._id,
      receiverId: receiver,
      email: user.email,
    } as CreateLeagueInvitationInputModel;

    createLeagueInvitation(inputModel);
    hideDialog();
  };

  return (
    <View>
      {isLoadingUsers || isLoadingCreateLeagueInvitation ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <Button
            onPress={showDialog}
            mode="contained"
            color={colors.bg.primary}
          >
            SEND INVITATION
          </Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>INVITE PLAYER</Dialog.Title>
              <Dialog.Content>
                <Spacer position="top" size="large">
                  <SelectDropdown
                    rowTextStyle={{ textTransform: "capitalize" }}
                    buttonTextStyle={{ textTransform: "capitalize" }}
                    buttonStyle={{ width: "100%" }}
                    search
                    onChangeSearchInputText={(text) => setUserSearchValue(text)}
                    data={
                      userSearchValue
                        ? (filteredUserSelectList as User[])
                        : (usersData?.users as User[])
                    }
                    defaultValue={null}
                    onSelect={(selectedItem, index) => {
                      setReceiver(selectedItem._id);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return (
                        selectedItem.firstName + " " + selectedItem.lastName
                      );
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item.firstName + " " + item.lastName;
                    }}
                  />
                </Spacer>
              </Dialog.Content>
              <Dialog.Actions>
                <Button color={colors.ui.predict} onPress={hideDialog}>
                  CANCEL
                </Button>
                <Button
                  color={colors.bg.primary}
                  onPress={handleCreateLeagueInvitation}
                >
                  INVITE
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </View>
  );
};
