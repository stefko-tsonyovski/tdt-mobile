import React, { FC } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { DataTable } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  Player,
  useSinglePlayer,
} from "../../../../services/players/players.service";

export type MatchSummary = {
  homeId: number;
  homeSets: number;
  homeSet1: number;
  homeSet2: number;
  homeSet3: number;
  homeSet4: number;
  homeSet5: number;
  awayId: number;
  awaySets: number;
  awaySet1: number;
  awaySet2: number;
  awaySet3: number;
  awaySet4: number;
  awaySet5: number;
};

export type MatchTabSummaryProps = {
  summary: MatchSummary;
};

export const MatchTabSummary: FC<MatchTabSummaryProps> = ({ summary }) => {
  const {
    homeId,
    homeSets,
    homeSet1,
    homeSet2,
    homeSet3,
    homeSet4,
    homeSet5,
    awayId,
    awaySets,
    awaySet1,
    awaySet2,
    awaySet3,
    awaySet4,
    awaySet5,
  } = summary;

  const { data: homePlayer, isLoading: homeIsLoading } =
    useSinglePlayer(homeId);
  const { data: awayPlayer, isLoading: awayIsLoading } =
    useSinglePlayer(awayId);

  if (homeIsLoading || awayIsLoading) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  const { name: homeName, country: homeCountry } = homePlayer?.player as Player;
  const { name: awayName, country: awayCountry } = awayPlayer?.player as Player;

  console.log(homeSets);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title> </DataTable.Title>
        <DataTable.Title style={{ maxWidth: 30 }}>S</DataTable.Title>
        <DataTable.Title style={{ maxWidth: 30 }}>1</DataTable.Title>
        <DataTable.Title style={{ maxWidth: 30 }}>2</DataTable.Title>
        <DataTable.Title style={{ maxWidth: 30 }}>3</DataTable.Title>
        <DataTable.Title style={{ maxWidth: 30 }}>4</DataTable.Title>
        <DataTable.Title style={{ maxWidth: 30 }}>5</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell
          textStyle={{ fontWeight: homeSets > awaySets ? "bold" : "normal" }}
        >
          {homeName} ({homeCountry})
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{ fontWeight: "bold" }}
        >
          {homeSets === -1 || !homeSets ? "n/a" : homeSets}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {homeSet1 === -1 || !homeSet1 ? "n/a" : homeSet1}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {homeSet2 === -1 || !homeSet2 ? "n/a" : homeSet2}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {homeSet3 === -1 || !homeSet3 ? "n/a" : homeSet3}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {homeSet4 === -1 || !homeSet4 ? "n/a" : homeSet4}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {homeSet5 === -1 || !homeSet5 ? "n/a" : homeSet5}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell
          textStyle={{ fontWeight: awaySets > homeSets ? "bold" : "normal" }}
        >
          {awayName} ({awayCountry})
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{ fontWeight: "bold" }}
        >
          {awaySets === -1 || !awaySets ? "n/a" : awaySets}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {awaySet1 === -1 || !awaySet1 ? "n/a" : awaySet1}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {awaySet2 === -1 || !awaySet2 ? "n/a" : awaySet2}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {awaySet3 === -1 || !awaySet3 ? "n/a" : awaySet3}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {awaySet4 === -1 || !awaySet4 ? "n/a" : awaySet4}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>
          {awaySet5 === -1 || !awaySet5 ? "n/a" : awaySet5}
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
