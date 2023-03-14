import { useAtom } from "jotai";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { useCountdown } from "../../../../services/weeks/weeks.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { CurrentWeekTitle } from "../current-week/current-week.styles";
import { TabButton, TabButtonText } from "./countdown.styles";
import Spinner from "react-native-loading-spinner-overlay";

export const Countdown = () => {
  const [selectedWeek] = useAtom(selectedWeekAtom);
  const { data: countdownTime, isLoading: isLoadingCountdown } = useCountdown(
    selectedWeek.value
  );

  return (
    <>
      {isLoadingCountdown ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          {Number(countdownTime?.countdownDays) >= 0 ||
          Number(countdownTime?.countdownHours) >= 0 ||
          Number(countdownTime?.countdownMinutes) >= 0 ? (
            <Spacer position="bottom" size="large">
              <View>
                <CurrentWeekTitle variant="body">
                  REMAINING TIME:
                </CurrentWeekTitle>
              </View>
            </Spacer>
          ) : (
            ""
          )}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {Number(countdownTime?.countdownDays) >= 0 ||
            Number(countdownTime?.countdownHours) >= 0 ||
            Number(countdownTime?.countdownMinutes) >= 0 ? (
              <>
                <TabButton mode="outlined" color={colors.bg.primary}>
                  <TabButtonText variant="body">
                    {Number(countdownTime?.countdownDays) + " days"}
                  </TabButtonText>
                </TabButton>
                <Spacer position="left" size="medium">
                  <TabButton mode="outlined" color={colors.bg.primary}>
                    <TabButtonText variant="body">
                      {Number(countdownTime?.countdownHours) + " hours"}
                    </TabButtonText>
                  </TabButton>
                </Spacer>
                <Spacer position="left" size="medium">
                  <TabButton mode="outlined" color={colors.bg.primary}>
                    <TabButtonText variant="body">
                      {Number(countdownTime?.countdownMinutes) + " minutes"}
                    </TabButtonText>
                  </TabButton>
                </Spacer>
              </>
            ) : (
              <CurrentWeekTitle variant="body">
                DEADLINE PASSED!
              </CurrentWeekTitle>
            )}
          </View>
        </>
      )}
    </>
  );
};
