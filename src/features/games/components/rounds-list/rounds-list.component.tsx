import React, { FC } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { Round } from "../../../../services/rounds/rounds.service";
import { RoundItem } from "../round-item/round-item.component";
import { RoundsListContainer } from "./rounds-list.styles";

export type RoundsListProps = {
  rounds: Round[];
};

export const RoundsList: FC<RoundsListProps> = ({ rounds }) => {
  return (
    <RoundsListContainer>
      {rounds.map((round) => (
        <Spacer key={round._id} position="top" size="large">
          <Spacer position="left" size="medium">
            <RoundItem round={round} />
          </Spacer>
        </Spacer>
      ))}
    </RoundsListContainer>
  );
};
