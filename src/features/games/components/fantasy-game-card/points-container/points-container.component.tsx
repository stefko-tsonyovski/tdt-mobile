import { useContext } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../../../services/authentication/authentication.context";
import { useUserWeek } from "../../../../../services/user-weeks/user-weeks.service";
import { useAtom } from "jotai";
import { selectedWeekAtom } from "../../../../../utils/atoms";
import { useGetTotal } from "../../../../../services/players/players.service";
import { StatsCircle } from "../../stats-circle/stats-circle.component";
import { colors } from "../../../../../infrastructure/theme/colors";
import { Text } from "../../../../../components/typography/text.component";
import { StatsCirclesContainer } from "../balance-trades-container/brackets-trades-container.styles";

export const PointsContainer = () => {
  const { user } = useContext(AuthenticationContext);
  const [selectedWeek] = useAtom(selectedWeekAtom);

  const { data: userWeekData, isLoading: isLoadingUserWeek } = useUserWeek(
    selectedWeek.value,
    user.email
  );
  const { data: total, isLoading: isLoadingTotal } = useGetTotal(user.email);

  return (
    <>
      {isLoadingUserWeek || isLoadingTotal ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <StatsCirclesContainer>
          <View>
            <StatsCircle
              color={colors.bg.primary}
              text={`${selectedWeek.text} POINTS`}
              points={Number(userWeekData?.userWeek.points)}
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
