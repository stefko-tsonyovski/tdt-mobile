import { useAtom } from "jotai";
import React, { FC } from "react";
import { Chip } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { Round } from "../../../../services/rounds/rounds.service";
import {
  bracketsCurrentPageAtom,
  selectedRoundId,
} from "../../../../utils/atoms";
import { PLAYERS_INITIAL_PAGE } from "../../../../utils/constants";
import { RoundItemChip } from "./round-item.styles";

export type RoundItemProps = {
  round: Round;
};

export const RoundItem: FC<RoundItemProps> = ({ round }) => {
  const [, setRoundId] = useAtom(selectedRoundId);
  const [, setPage] = useAtom(bracketsCurrentPageAtom);

  return (
    <RoundItemChip
      onPress={() => {
        setRoundId(round._id);
        setPage(PLAYERS_INITIAL_PAGE);
      }}
    >
      {round.name}
    </RoundItemChip>
  );
};
