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
import { useTradesByUser } from "../../../../../services/users/users.service";
import { StatsCirclesContainer } from "./brackets-trades-container.styles";
import Spinner from "react-native-loading-spinner-overlay";

export const BalanceTradesContainer = () => {
  const { user } = useContext(AuthenticationContext);
  const [selectedWeek] = useAtom(selectedWeekAtom);

  const { data: userWeekData, isLoading: isLoadingUserWeek } = useUserWeek(
    selectedWeek.value,
    user.email
  );
  const { data: trades, isLoading: isLoadingTrades } = useTradesByUser(
    user.email
  );

  return (
    <>
      {isLoadingUserWeek || isLoadingTrades ? (
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
              text={`YOUR BALANCE`}
              points={Number(userWeekData?.userWeek.balance) / 1000000}
            />
          </View>
          <Spacer position="left" size="xxl">
            <StatsCircle
              color={colors.bg.primary}
              text={`TOTAL TRADES`}
              points={Number(trades?.trades)}
            />
          </Spacer>
        </StatsCirclesContainer>
      )}
    </>
  );
};
