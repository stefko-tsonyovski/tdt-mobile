import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import CountryFlag from "react-native-country-flag";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Card, Colors } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
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
    <HeadingContainer>
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
