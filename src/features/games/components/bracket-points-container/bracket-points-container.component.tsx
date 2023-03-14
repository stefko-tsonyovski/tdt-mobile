import { useAtom } from "jotai";
import React, { useContext } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import {
  useGetTotal,
  useGetWeekly,
} from "../../../../services/picks/picks.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { StatsCirclesContainer } from "../fantasy-game-card/balance-trades-container/brackets-trades-container.styles";
import { StatsCircle } from "../stats-circle/stats-circle.component";
import Spinner from "react-native-loading-spinner-overlay";

export const BracketPointsContainer = () => {
  const { user } = useContext(AuthenticationContext);
  const [selectedWeek] = useAtom(selectedWeekAtom);

  const { data: weeklyPoints, isLoading: isLoadingUserWeek } = useGetWeekly(
    selectedWeek.value,
    user.email
  );
  const { data: total, isLoading: isLoadingTotal } = useGetTotal(user.email);

  return (
    <>
      {isLoadingUserWeek || isLoadingTotal ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <StatsCirclesContainer>
          <View>
            <StatsCircle
              color={colors.bg.primary}
              text={`${selectedWeek.text} POINTS`}
              points={Number(weeklyPoints)}
            />
          </View>
          <Spacer position="left" size="xxl">
            <StatsCircle
              color={colors.bg.primary}
              text={`TOTAL POINTS`}
              points={Number(total)}
            />
          </Spacer>
        </StatsCirclesContainer>
      )}
    </>
  );
};
