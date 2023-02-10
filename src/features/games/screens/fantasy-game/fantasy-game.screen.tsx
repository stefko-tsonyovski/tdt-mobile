import { ScrollView } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { SafeArea } from "../../../../components/utility/safe-area.component";
import { Countdown } from "../../components/countdown/countdown.component";
import { CurrentWeek } from "../../components/current-week/current-week.component";
import { BalanceTradesContainer } from "../../components/fantasy-game-card/balance-trades-container/balance-trades-container.component";
import { PointsContainer } from "../../components/fantasy-game-card/points-container/points-container.component";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { WeeksMenu } from "../../components/menu/menu.component";
import { TennisBalls } from "../../components/tennis-balls/tennis-balls.component";

export const FantasyGameScreen = () => {
  return (
    <SafeArea>
      <FantasyGameScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer position="top" size="xl">
            <WeeksMenu />
          </Spacer>

          <Spacer position="top" size="xl">
            <PointsContainer />
          </Spacer>

          <Spacer position="top" size="xl">
            <BalanceTradesContainer />
          </Spacer>

          <Spacer position="top" size="xl">
            <CurrentWeek />
          </Spacer>

          <Spacer position="top" size="large">
            <Countdown />
          </Spacer>

          <Spacer position="top" size="xl">
            <TennisBalls />
          </Spacer>
        </ScrollView>
      </FantasyGameScreenContainer>
    </SafeArea>
  );
};
