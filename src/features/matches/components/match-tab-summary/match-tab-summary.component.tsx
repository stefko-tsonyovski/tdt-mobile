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
          textStyle={{
            fontWeight:
              homeSets >= 0 && homeSets > awaySets ? "bold" : "normal",
          }}
        >
          {homeName} ({homeCountry})
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              homeSets >= 0 && homeSets > awaySets ? "bold" : "normal",
          }}
        >
          {homeSets < 0 || isNaN(homeSets) ? "-" : homeSets}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              homeSet1 >= 0 && homeSet1 > awaySet1 ? "bold" : "normal",
          }}
        >
          {homeSet1 < 0 || isNaN(homeSet1) ? "-" : homeSet1}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              homeSet2 >= 0 && homeSet2 > awaySet2 ? "bold" : "normal",
          }}
        >
          {homeSet2 < 0 || isNaN(homeSet2) ? "-" : homeSet2}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              homeSet3 >= 0 && homeSet3 > awaySet3 ? "bold" : "normal",
          }}
        >
          {homeSet3 < 0 || isNaN(homeSet3) ? "-" : homeSet3}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              homeSet4 >= 0 && homeSet4 > awaySet4 ? "bold" : "normal",
          }}
        >
          {homeSet4 < 0 || isNaN(homeSet4) ? "-" : homeSet4}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              homeSet5 >= 0 && homeSet5 > awaySet5 ? "bold" : "normal",
          }}
        >
          {homeSet5 < 0 || isNaN(homeSet5) ? "-" : homeSet5}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell
          textStyle={{
            fontWeight:
              awaySets >= 0 && awaySets > homeSets ? "bold" : "normal",
          }}
        >
          {awayName} ({awayCountry})
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              awaySets >= 0 && awaySets > homeSets ? "bold" : "normal",
          }}
        >
          {awaySets < 0 || isNaN(awaySets) ? "-" : awaySets}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              awaySet1 >= 0 && awaySet1 > homeSet1 ? "bold" : "normal",
          }}
        >
          {awaySet1 < 0 || isNaN(awaySet1) ? "-" : awaySet1}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              awaySet2 >= 0 && awaySet2 > homeSet2 ? "bold" : "normal",
          }}
        >
          {awaySet2 < 0 || isNaN(awaySet2) ? "-" : awaySet2}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              awaySet3 >= 0 && awaySet3 > homeSet3 ? "bold" : "normal",
          }}
        >
          {awaySet3 < 0 || isNaN(awaySet3) ? "-" : awaySet3}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              awaySet4 >= 0 && awaySet4 > homeSet4 ? "bold" : "normal",
          }}
        >
          {awaySet4 < 0 || isNaN(awaySet4) ? "-" : awaySet4}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ maxWidth: 30 }}
          textStyle={{
            fontWeight:
              awaySet5 >= 0 && awaySet5 > homeSet5 ? "bold" : "normal",
          }}
        >
          {awaySet5 < 0 || isNaN(awaySet5) ? "-" : awaySet5}
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
