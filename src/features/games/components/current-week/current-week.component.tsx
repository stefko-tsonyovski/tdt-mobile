import { Text } from "../../../../components/typography/text.component";
import { useWeekByCurrentDate } from "../../../../services/weeks/weeks.service";
import { CurrentWeekTitle } from "./current-week.styles";

export const CurrentWeek = () => {
  const { data: currentWeek, isLoading: isLoadingCurrentWeek } =
    useWeekByCurrentDate();

  return (
    <>
      {isLoadingCurrentWeek ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <CurrentWeekTitle variant="body">
          CURRENT WEEK:{" "}
          {currentWeek?.week ? currentWeek.week.name : "NO DATA AVAILABLE!"}
        </CurrentWeekTitle>
      )}
    </>
  );
};
