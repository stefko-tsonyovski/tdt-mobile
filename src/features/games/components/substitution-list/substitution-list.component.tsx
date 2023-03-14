import { useAtom } from "jotai";
import {
  isSubstitutionsSidebarOpenAtom,
  selectedWeekAtom,
} from "../../../../utils/atoms";
import { View, FlatList } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Player,
  PlayerInTeam,
  usePlayersInTeam,
  useSubstitutions,
} from "../../../../services/players/players.service";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { useContext, useRef } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { SubstitutionCard } from "../substitution-card/substitution-card.component";
import Spinner from "react-native-loading-spinner-overlay";

export const SubstitutionList = () => {
  const flatListRef = useRef<FlatList>(null);

  const { user } = useContext(AuthenticationContext);

  const [visible, setVisible] = useAtom(isSubstitutionsSidebarOpenAtom);
  const [selected] = useAtom(selectedWeekAtom);

  const { data: filteredPlayers, isLoading: isLoadingFiltered } =
    useSubstitutions(
      {
        selected,
      },
      user.email
    );

  const { data: playersInTeamData, isLoading: isLoadingPlayersInTeam } =
    usePlayersInTeam({ selected }, user.email);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <View>
        <Button
          onPress={showDialog}
          mode="contained"
          color={colors.bg.secondary}
        >
          View all substitutions
        </Button>
        <Portal>
          <Dialog
            style={{ backgroundColor: colors.ui.tertiary }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Substitutions</Dialog.Title>
            <Dialog.Content>
              <Spacer position="top" size="large">
                {isLoadingFiltered || isLoadingPlayersInTeam ? (
                  <Spinner
                    visible={true}
                    textContent={"This may take a while..."}
                    textStyle={{ color: colors.text.inverse }}
                  />
                ) : Number(filteredPlayers?.players?.length) > 0 ? (
                  <FlatList
                    ref={flatListRef}
                    style={{ height: 100 }}
                    data={filteredPlayers?.players as Player[]}
                    keyExtractor={(item, index) => {
                      return item._id + index;
                    }}
                    renderItem={({ item }) => {
                      return (
                        <SubstitutionCard
                          item={item}
                          players={playersInTeamData?.players as PlayerInTeam[]}
                        />
                      );
                    }}
                  />
                ) : (
                  <Text variant="body">No subs!</Text>
                )}
              </Spacer>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color={colors.bg.secondary} onPress={hideDialog}>
                Close
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};
