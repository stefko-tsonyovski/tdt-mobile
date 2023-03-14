import { useAtom } from "jotai";
import React, { FC, useContext } from "react";
import { Text } from "../../../../components/typography/text.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  Bracket,
  useAllBracketsByTournamentAndRound,
} from "../../../../services/brackets/brackets.service";
import { useByTournament } from "../../../../services/picks/picks.service";
import { bracketsCurrentPageAtom } from "../../../../utils/atoms";
import { BracketsCard } from "../brackets-card/brackets-card.component";
import { Pick } from "../../../../services/picks/picks.service";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { IconButton } from "react-native-paper";
import {
  BRACKETS_ITEMS_PER_PAGE,
  PLAYERS_INITIAL_PAGE,
} from "../../../../utils/constants";
import { colors } from "../../../../infrastructure/theme/colors";
import { BracketPagination } from "./brackets-container.styles";
import Spinner from "react-native-loading-spinner-overlay";

export type BracketsContainerProps = {
  tournamentId: number;
  roundId: string;
};

export const BracketsContainer: FC<BracketsContainerProps> = ({
  tournamentId,
  roundId,
}) => {
  const { user } = useContext(AuthenticationContext);
  const [page, setPage] = useAtom(bracketsCurrentPageAtom);

  const { data: bracketsData, isFetching: isFetchingBrackets } =
    useAllBracketsByTournamentAndRound(
      tournamentId,
      roundId,
      page,
      BRACKETS_ITEMS_PER_PAGE
    );

  const { data: picksData, isLoading: isLoadingPicks } = useByTournament(
    tournamentId,
    roundId,
    user.email
  );

  const handlePrevious = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

  return (
    <>
      {isLoadingPicks || isFetchingBrackets ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : bracketsData?.brackets?.length && bracketsData.brackets ? (
        <View>
          {bracketsData.brackets.map((bracket) => (
            <BracketsCard
              key={bracket._id}
              bracket={bracket}
              picks={picksData?.picks as Pick[]}
            />
          ))}

          <Spacer position="top" size="large">
            <BracketPagination>
              <IconButton
                disabled={page <= PLAYERS_INITIAL_PAGE}
                icon="rewind"
                onPress={handlePrevious}
              />
              <Spacer position="left" size="large">
                <IconButton
                  disabled={
                    page >=
                    Math.ceil(bracketsData.totalItems / BRACKETS_ITEMS_PER_PAGE)
                  }
                  icon="fast-forward"
                  onPress={handleNext}
                />
              </Spacer>
            </BracketPagination>
          </Spacer>
        </View>
      ) : (
        <Text variant="body">NO BRACKETS FOR THIS ROUND!</Text>
      )}
    </>
  );
};
