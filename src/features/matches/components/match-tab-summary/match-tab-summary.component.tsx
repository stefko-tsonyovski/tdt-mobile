import React, { FC } from "react";
import { DataTable } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import {
  Player,
  useSinglePlayer,
} from "../../../../services/players/players.service";

export type MatchSummary = {
  homeId: number;
  homeSets: string;
  homeSet1: string;
  homeSet2: string;
  homeSet3: string;
  homeSet4: string;
  homeSet5: string;
  awayId: number;
  awaySets: string;
  awaySet1: string;
  awaySet2: string;
  awaySet3: string;
  awaySet4: string;
  awaySet5: string;
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
    return <Text variant="body">Loading...</Text>;
  }

  const { name: homeName, country: homeCountry } = homePlayer?.player as Player;
  const { name: awayName, country: awayCountry } = awayPlayer?.player as Player;

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
        <DataTable.Cell>
          {homeName} ({homeCountry}){" "}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{homeSets}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{homeSet1}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{homeSet2}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{homeSet3}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{homeSet4}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{homeSet5}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>
          {awayName} ({awayCountry}){" "}
        </DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{awaySets}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{awaySet1}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{awaySet2}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{awaySet3}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{awaySet4}</DataTable.Cell>
        <DataTable.Cell style={{ maxWidth: 30 }}>{awaySet5}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
