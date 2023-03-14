import React, { FC } from "react";
import CountryFlag from "react-native-country-flag";
import { Card } from "react-native-paper";
import { Tournament } from "../../../../services/tournaments/tournaments.service";
import { DetailCard } from "../tournament-detail-card/tournament-detail-card.styles";

type TournamentItemDetailCardProps = {
  tournament: Tournament;
};

export const TournamentItemDetailCard: FC<TournamentItemDetailCardProps> = ({
  tournament,
}) => {
  const { name, city, countryKey, surface } = tournament;

  return (
    <>
      <DetailCard>
        <Card.Title
          leftStyle={{ marginRight: 10 }}
          titleStyle={{ marginVertical: -5 }}
          left={(props) => (
            <CountryFlag {...props} size={25} isoCode={countryKey} />
          )}
          title={`${name}, ${surface}`}
          subtitle={city}
        />
      </DetailCard>
    </>
  );
};
