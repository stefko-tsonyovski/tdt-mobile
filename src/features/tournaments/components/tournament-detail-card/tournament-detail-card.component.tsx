import React, { FC } from "react";
import { Card } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import { Text } from "../../../../components/typography/text.component";
import { DetailCard } from "./tournament-detail-card.styles";

import { useSingleTournament } from "../../../../services/tournaments/tournaments.service";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";
type TournamentDetailCardProps = {
  tournamentId: number;
};

export const TournamentDetailCard: FC<TournamentDetailCardProps> = ({
  tournamentId,
}) => {
  const { data, isLoading } = useSingleTournament(tournamentId);

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
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
  );
};
