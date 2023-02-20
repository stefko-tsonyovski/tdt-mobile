import React, { FC } from "react";
import { Card, Colors, FAB } from "react-native-paper";
import CountryFlag from "react-native-country-flag";
import { Tournament } from "../../../../services/tournaments/tournaments.service";
import { Text } from "../../../../components/typography/text.component";

import {
  CircleContainerFavorites,
  CircleContainer,
} from "./tournament-item-card.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";

export type TournamentItemCardProps = {
  tournament: Tournament;
};

export const TournamentItemCard: FC<TournamentItemCardProps> = ({
  tournament,
}) => {
  const { countryName, name } = tournament;

  return (
    <Card>
      <Card.Title
        leftStyle={{ marginRight: 35 }}
        titleStyle={{ marginVertical: -5 }}
        left={(props) => (
          <CountryFlag {...props} isoCode={tournament.countryKey} />
        )}
        right={(props) => (
          <Card.Actions>
            <Spacer position="right" size="medium">
              <CircleContainerFavorites>
                <Text variant="body">{tournament.favoritesCount}</Text>
              </CircleContainerFavorites>
            </Spacer>

            <CircleContainer>
              <Text variant="body">{tournament.matchesCount}</Text>
            </CircleContainer>
          </Card.Actions>
        )}
        title={countryName}
        subtitle={name}
      />
    </Card>
  );
};
