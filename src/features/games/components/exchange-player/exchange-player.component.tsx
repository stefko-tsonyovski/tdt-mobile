import React, { useState, FC, useContext } from "react";
import { View } from "react-native";
import {
  IconButton,
  Button,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  PerformSubstitutionInputModel,
  PlayerInTeam,
} from "../../../../services/players/players.service";
import SelectDropdown from "react-native-select-dropdown";
import { useAtom } from "jotai";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";

export type ExchangePlayerProps = {
  playersInTeam: PlayerInTeam[];
  substitutionId: number;
  substitutionName: string;
  handler: (inputModel: PerformSubstitutionInputModel) => void;
};

export const ExchangePlayer: FC<ExchangePlayerProps> = ({
  handler,
  substitutionId,
  substitutionName,
  playersInTeam,
}) => {
  const { user } = useContext(AuthenticationContext);
  const [selected] = useAtom(selectedWeekAtom);

  const [visible, setVisible] = useState(false);
  const [playerSearchValue, setPlayerSearchValue] = useState("");
  const [starter, setStarter] = useState("");

  const filteredPlayerSelectList = !playersInTeam
    ? []
    : playersInTeam.filter((item) => {
        const { name } = item;

        return name.toLowerCase().includes(playerSearchValue.toLowerCase());
      });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleExchange = () => {
    const inputModel = {
      substitutionId,
      starterId: Number(starter),
      weekId: selected.value,
      email: user.email,
    };

    handler(inputModel);
    hideDialog();
  };

  return (
    <View>
      <IconButton
        onPress={showDialog}
        size={30}
        icon="plus-circle-outline"
        color={colors.bg.secondary}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Exchanging {substitutionName} for ...</Dialog.Title>
          <Dialog.Content>
            <Spacer position="top" size="large">
              <SelectDropdown
                rowTextStyle={{ textTransform: "capitalize" }}
                buttonTextStyle={{ textTransform: "capitalize" }}
                buttonStyle={{ width: "100%" }}
                search
                onChangeSearchInputText={(text) => setPlayerSearchValue(text)}
                data={
                  playerSearchValue
                    ? (filteredPlayerSelectList as PlayerInTeam[])
                    : (playersInTeam as PlayerInTeam[])
                }
                defaultValue={null}
                onSelect={(selectedItem, index) => {
                  setStarter(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.name;
                }}
              />
            </Spacer>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={colors.bg.secondary} onPress={handleExchange}>
              Exchange
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
