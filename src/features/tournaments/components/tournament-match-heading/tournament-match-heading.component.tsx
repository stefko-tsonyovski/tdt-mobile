import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Card, Colors } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { useSingleTournament } from "../../../../services/tournaments/tournaments.service";
import {
  HeadingCardTitle,
  HeadingContainer,
} from "./tournament-match-heading.styles";

type TournamentMatchHeadingProps = {
  tournamentId: number;
};

export const TournamentMatchHeading: FC<TournamentMatchHeadingProps> = ({
  tournamentId,
}) => {
  const { data, isLoading } = useSingleTournament(tournamentId);
  return (
    <HeadingContainer>
      {!isLoading && data ? (
        <Card>
          <HeadingCardTitle
            left={() => (
              <CountryFlag isoCode={data.tournament.countryKey} size={25} />
            )}
            titleStyle={styles.title}
            title={
              <>
                <Text style={styles.country} variant="body">
                  {data.tournament.countryName}:{"  "}
                </Text>
                <Text variant="body" style={styles.details}>
                  {`${data.tournament.name},  ${data.tournament.surface}`}
                </Text>
              </>
            }
          />
        </Card>
      ) : (
        <Text variant="body">Loading....</Text>
      )}
    </HeadingContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
  },
  country: {
    fontSize: 12,
    color: Colors.grey600,
  },
  details: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.grey900,
  },
});
