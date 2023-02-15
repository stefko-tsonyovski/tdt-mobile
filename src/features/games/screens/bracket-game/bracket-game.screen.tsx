import React from "react";
import { ScrollView } from "react-native";
import { HorizontalDivider } from "../../../../components/horizontal-divider/horizontal-divider.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { BracketPointsContainer } from "../../components/bracket-points-container/bracket-points-container.component";
import { CalculateTotalBracket } from "../../components/calculate-total-bracket/calculate-total-bracket.component";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { WeeksMenu } from "../../components/menu/menu.component";
import { TournamentsCarousel } from "../../components/tournaments-carousel/tournaments-carousel.component";

export const BracketGameScreen = () => {
  return (
    <FantasyGameScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer position="top" size="small">
          <WeeksMenu />
        </Spacer>

        <Spacer position="top" size="xl">
          <BracketPointsContainer />
        </Spacer>

        <Spacer position="top" size="xl">
          <HorizontalDivider />
        </Spacer>

        <Spacer position="top" size="xl">
          <CalculateTotalBracket />
        </Spacer>

        <Spacer position="top" size="xl">
          <HorizontalDivider />
        </Spacer>

        <Spacer position="top" size="xl">
          <TournamentsCarousel />
        </Spacer>
      </ScrollView>
    </FantasyGameScreenContainer>
  );
};
