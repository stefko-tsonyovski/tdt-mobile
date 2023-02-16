import { useAtom } from "jotai";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Round,
  useAllRounds,
} from "../../../../services/rounds/rounds.service";
import {
  Tournament,
  useTournamentsByWeek,
} from "../../../../services/tournaments/tournaments.service";
import {
  bracketsCurrentPageAtom,
  currentTournamentAtom,
  selectedRoundId,
  selectedWeekAtom,
} from "../../../../utils/atoms";

import CountryFlag from "react-native-country-flag";
import { Chip, IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import {
  TournamentContainer,
  TournamentName,
} from "./tournaments-carousel.styles";
import { HorizontalDivider } from "../../../../components/horizontal-divider/horizontal-divider.styles";
import { RoundsList } from "../rounds-list/rounds-list.component";
import {
  Bracket,
  useAllBracketsByTournamentAndRound,
} from "../../../../services/brackets/brackets.service";
import {
  BRACKETS_ITEMS_PER_PAGE,
  PLAYERS_INITIAL_PAGE,
} from "../../../../utils/constants";
import { BracketsContainer } from "../brackets-container/brackets-container.component";

export const TournamentsCarousel = () => {
  const [selected] = useAtom(selectedWeekAtom);
  const [roundId] = useAtom(selectedRoundId);
  const [page, setPage] = useAtom(bracketsCurrentPageAtom);

  const [current, setCurrent] = useAtom(currentTournamentAtom);

  const { data: tournamentsData, isLoading: isLoadingTournaments } =
    useTournamentsByWeek(selected.value);
  const { data: roundsData, isLoading: isLoadingRounds } = useAllRounds();

  const { data: bracketsData, isFetching: isFetchingBrackets } =
    useAllBracketsByTournamentAndRound(
      Number(tournamentsData?.tournaments[current]?.id),
      roundId,
      page,
      BRACKETS_ITEMS_PER_PAGE
    );

  const handleArrowRightClick = () => {
    if (current <= 0) {
      setCurrent(Number(tournamentsData?.tournaments?.length) - 1);
    } else {
      setCurrent(current - 1);
    }

    setPage(PLAYERS_INITIAL_PAGE);
  };

  return (
    <>
      {isLoadingTournaments ||
      isLoadingRounds ||
      !tournamentsData?.tournaments[current] ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <>
          <TournamentContainer>
            <CountryFlag
              isoCode={
                tournamentsData?.tournaments[current]?.countryKey as string
              }
              size={25}
            />

            <Spacer position="left" size="large">
              <View></View>
            </Spacer>

            <TournamentName variant="body">
              {Number(tournamentsData?.tournaments[current]?.name?.length) >= 20
                ? tournamentsData?.tournaments[current]?.name?.substring(
                    0,
                    20
                  ) + "..."
                : tournamentsData?.tournaments[current]?.name}
            </TournamentName>
            <IconButton
              onPress={handleArrowRightClick}
              color={colors.ui.arrow}
              icon="arrow-right-bold"
            />
          </TournamentContainer>

          <Spacer position="top" size="xl">
            <HorizontalDivider />
          </Spacer>

          <RoundsList rounds={roundsData?.rounds as Round[]} />

          <Spacer position="top" size="xl">
            <HorizontalDivider />
          </Spacer>

          <Spacer position="top" size="large">
            <BracketsContainer
              brackets={bracketsData?.brackets as Bracket[]}
              totalItems={Number(bracketsData?.totalItems)}
              isFetching={isFetchingBrackets}
              tournamentId={Number(tournamentsData?.tournaments[current]?.id)}
              roundId={roundId}
            />
          </Spacer>
        </>
      )}
    </>
  );
};
