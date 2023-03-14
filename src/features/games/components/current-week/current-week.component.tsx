import { Text } from "../../../../components/typography/text.component";
import { useWeekByCurrentDate } from "../../../../services/weeks/weeks.service";
import { CurrentWeekTitle } from "./current-week.styles";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../../../../infrastructure/theme/colors";

export const CurrentWeek = () => {
  const { data: currentWeek, isLoading: isLoadingCurrentWeek } =
    useWeekByCurrentDate();

  return (
    <>
      {isLoadingCurrentWeek ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <CurrentWeekTitle variant="body">
          CURRENT WEEK:{" "}
          {currentWeek?.week ? currentWeek.week.name : "NO DATA AVAILABLE!"}
        </CurrentWeekTitle>
      )}
    </>
  );
};
