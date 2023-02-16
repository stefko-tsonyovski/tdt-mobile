import React, { FC } from "react";
import { Card } from "react-native-paper";
import { TournamentDto } from "../../../../services/tournaments/tournaments.service";

export type TournamentItemCardProps = {
  tournament: TournamentDto;
};

export const TournamentItemCard: FC<TournamentItemCardProps> = ({
  tournament,
}) => {
  const { countryName, name } = tournament;

  return (
    <Card>
      <Card.Title title={countryName} subtitle={name} />
    </Card>
  );
};
