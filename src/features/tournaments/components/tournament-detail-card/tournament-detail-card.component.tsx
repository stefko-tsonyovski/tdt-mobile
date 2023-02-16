import React, { FC } from "react";
import { Card } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { DetailCard } from "./tournament-detail-card.styles";

import { useSingleTournament } from "../../../../services/tournaments/tournaments.service";
type TournamentDetailCardProps = {
  tournamentId: number;
};

export const TournamentDetailCard: FC<TournamentDetailCardProps> = ({
  tournamentId,
}) => {
  const { data, isLoading } = useSingleTournament(tournamentId);

  return (
    <>
      {!isLoading && data?.tournament ? (
        <DetailCard>
          <Card.Title
            leftStyle={{ marginRight: 10 }}
            titleStyle={{ marginVertical: -5 }}
            left={(props) => (
              <CountryFlag
                {...props}
                size={25}
                isoCode={data.tournament.countryKey}
              />
            )}
            title={data.tournament.countryName}
          />
          <Card.Content>
            <Text variant="body">
              {data.tournament.city} {data.tournament.code}
            </Text>
          </Card.Content>
        </DetailCard>
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </>
  );
};
