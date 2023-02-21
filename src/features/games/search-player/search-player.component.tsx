import { useAtom } from "jotai";
import React from "react";
import { View } from "react-native";
import { Searchbar, Checkbox } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructure/theme/colors";
import {
  fetchPlayersAtom,
  isBoughtAtom,
  playersCurrentPageAtom,
  playerSearchTermAtom,
} from "../../../utils/atoms";
import { PLAYERS_INITIAL_PAGE } from "../../../utils/constants";
import { CheckboxContainer } from "./search-player.styles";

export const SearchPlayer = () => {
  const [searchQuery, setSearchQuery] = useAtom(playerSearchTermAtom);
  const [checked, setChecked] = useAtom(isBoughtAtom);
  const [, setFetchPlayers] = useAtom(fetchPlayersAtom);
  const [, setPage] = useAtom(playersCurrentPageAtom);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    setFetchPlayers(false);
  };

  const handleSearch = () => {
    setFetchPlayers(true);
    setPage(PLAYERS_INITIAL_PAGE);
  };

  return (
    <>
      <Searchbar
        placeholder="Click the search icon for results..."
        onChangeText={onChangeSearch}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        value={searchQuery}
      />
      <Spacer position="top" size="large">
        <CheckboxContainer>
          <Checkbox
            color={colors.bg.secondary}
            uncheckedColor={colors.bg.secondary}
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
              setFetchPlayers(false);
            }}
          />
          <Text variant="body">BOUGHT PLAYERS</Text>
        </CheckboxContainer>
      </Spacer>
    </>
  );
};
