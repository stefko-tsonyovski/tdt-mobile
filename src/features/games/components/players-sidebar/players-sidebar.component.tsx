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
import { Avatar, Button, Dialog, IconButton, Portal } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Player,
  PlayerInTeam,
  useFilteredPlayers,
  usePlayersInTeam,
} from "../../../../services/players/players.service";
import {
  PLAYERS_INITIAL_PAGE,
  PLAYERS_ITEMS_PER_PAGE,
  PLAYER_ITEM_HEIGHT,
} from "../../../../utils/constants";
import { SearchPlayer } from "../../search-player/search-player.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { useContext, useRef, useState } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useEffect } from "react";
import { PlayersSidebarCard } from "../players-sidebar-card/players-sidebar-card.component";

export const PlayersSidebar = () => {
  const flatListRef = useRef<FlatList>(null);

  const { user } = useContext(AuthenticationContext);

  const [visible, setVisible] = useAtom(isPlayersSidebarOpenAtom);

  const [playerSearchTerm] = useAtom(playerSearchTermAtom);
  const [checked] = useAtom(isBoughtAtom);
  const [selected] = useAtom(selectedWeekAtom);
  const [fetchPlayers] = useAtom(fetchPlayersAtom);
  const [page, setPage] = useAtom(playersCurrentPageAtom);

  const [players, setPlayers] = useState([] as Player[]);
  const [isLoadingNew, setIsLoadingNew] = useState(false);

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

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      Number(filteredPlayers?.totalItems) / PLAYERS_ITEMS_PER_PAGE
    );

    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const getItemLayout = (data: Player[] | null | undefined, index: number) => ({
    length: PLAYER_ITEM_HEIGHT,
    offset: PLAYER_ITEM_HEIGHT * index,
    index,
  });

  useEffect(() => {
    let allPlayers = [
      ...players,
      ...((filteredPlayers?.players.filter(
        (fp) => !players.some((p) => p._id === fp._id)
      ) || []) as Player[]),
    ];

    if ((playerSearchTerm || checked) && fetchPlayers) {
      allPlayers = filteredPlayers?.players as Player[];
    }

    setPlayers(allPlayers);
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        animated: false,
        index: allPlayers.length - 1,
      });
    }, 400);
  }, [filteredPlayers]);

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
                {isLoadingFiltered || isLoadingNew || isLoadingPlayersInTeam ? (
                  <Text variant="body">Loading...</Text>
                ) : players.length > 0 ? (
                  <FlatList
                    ref={flatListRef}
                    style={{ height: 100 }}
                    data={players.sort(
                      (a: Player, b: Player) => a.ranking - b.ranking
                    )}
                    onEndReached={handleNextPage}
                    onEndReachedThreshold={0}
                    getItemLayout={getItemLayout}
                    keyExtractor={(item, index) => {
                      return item._id + index;
                    }}
                    renderItem={({ item }) => {
                      return (
                        <PlayersSidebarCard
                          item={item}
                          players={playersInTeamData?.players as PlayerInTeam[]}
                        />
                      );
                    }}
                  />
                ) : (
                  <Text variant="body">No results!</Text>
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
