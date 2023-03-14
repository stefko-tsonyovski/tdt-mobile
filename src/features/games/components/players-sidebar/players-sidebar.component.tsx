import { useAtom } from "jotai";
import {
  fetchPlayersAtom,
  isBoughtAtom,
  isPlayersSidebarOpenAtom,
  playersCurrentPageAtom,
  playerSearchTermAtom,
  selectedWeekAtom,
} from "../../../../utils/atoms";
import { View, FlatList } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Player,
  PlayerInTeam,
  useFilteredPlayers,
  usePlayersInTeam,
  useSubstitutions,
} from "../../../../services/players/players.service";
import { PLAYERS_ITEMS_PER_PAGE } from "../../../../utils/constants";
import { SearchPlayer } from "../../search-player/search-player.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { useContext, useRef, useState } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { PlayersSidebarCard } from "../players-sidebar-card/players-sidebar-card.component";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

export const PlayersSidebar = () => {
  const flatListRef = useRef<FlatList>(null);

  const { user } = useContext(AuthenticationContext);

  const [visible, setVisible] = useAtom(isPlayersSidebarOpenAtom);

  const [playerSearchTerm] = useAtom(playerSearchTermAtom);
  const [checked] = useAtom(isBoughtAtom);
  const [selected] = useAtom(selectedWeekAtom);
  const [fetchPlayers] = useAtom(fetchPlayersAtom);
  const [page] = useAtom(playersCurrentPageAtom);

  const [isLoadingNew] = useState(false);

  const { data: filteredPlayers, isFetching: isLoadingFiltered } =
    useFilteredPlayers(
      {
        playerSearchTerm,
        isBought: checked,
        selected,
        page,
        itemsPerPage: PLAYERS_ITEMS_PER_PAGE,
        email: user.email,
      },
      fetchPlayers
    );

  const { data: playersInTeamData, isLoading: isLoadingPlayersInTeam } =
    usePlayersInTeam({ selected }, user.email);
  const { data: substitutionsData, isLoading: isLoadingSubstitutions } =
    useSubstitutions(
      {
        selected,
      },
      user.email
    );

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
          View all players
        </Button>
        <Portal>
          <Dialog
            style={{ backgroundColor: colors.ui.tertiary }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Players</Dialog.Title>
            <Dialog.Content>
              <SearchPlayer />
              <Spacer position="top" size="large">
                {isLoadingFiltered ||
                isLoadingNew ||
                isLoadingPlayersInTeam ||
                isLoadingSubstitutions ? (
                  <Spinner
                    visible={true}
                    textContent={"This may take a while..."}
                    textStyle={{ color: colors.text.inverse }}
                  />
                ) : !fetchPlayers ? (
                  <Spacer position="top" size="large">
                    <Text
                      style={{ color: colors.bg.primary, textAlign: "center" }}
                      variant="body"
                    >
                      CLICK THE SEARCH ICON FOR RESULTS...
                    </Text>
                  </Spacer>
                ) : Number(filteredPlayers?.players.length) > 0 ? (
                  <FlatList
                    ref={flatListRef}
                    style={{ height: 100 }}
                    data={filteredPlayers?.players as Player[]}
                    keyExtractor={(item, index) => {
                      return item._id + index;
                    }}
                    renderItem={({ item }) => {
                      return (
                        <PlayersSidebarCard
                          item={item}
                          players={playersInTeamData?.players as PlayerInTeam[]}
                          substitutions={
                            substitutionsData?.players as PlayerInTeam[]
                          }
                        />
                      );
                    }}
                  />
                ) : (
                  <Spacer position="top" size="large">
                    <Text
                      style={{ color: colors.bg.primary, textAlign: "center" }}
                      variant="body"
                    >
                      NO RESULTS!
                    </Text>
                  </Spacer>
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
