import { CurrentWeekTitle } from "../current-week/current-week.styles";
import { useAtom } from "jotai";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { useUserWeek } from "../../../../services/user-weeks/user-weeks.service";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { TennisBallsContainer } from "./tennis-balls.styles";
import Spinner from "react-native-loading-spinner-overlay";

const countOfTennisBalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const TennisBalls = () => {
  const { user } = useContext(AuthenticationContext);

  const [selectedWeek] = useAtom(selectedWeekAtom);
  const { data: userWeek, isLoading: isLoadingUserWeek } = useUserWeek(
    selectedWeek.value,
    user.email
  );

  return (
    <>
      {isLoadingUserWeek ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <CurrentWeekTitle variant="body">YOUR TENNIS BALLS:</CurrentWeekTitle>
          <Spacer position="top" size="large">
            <TennisBallsContainer>
              {countOfTennisBalls.map((item) => {
                return userWeek && Number(userWeek?.userWeek?.balls) >= item ? (
                  <IconButton
                    size={35}
                    key={item}
                    color={colors.ui.activeTennisBall}
                    icon="tennis-ball"
                  />
                ) : (
                  <IconButton
                    size={35}
                    key={item}
                    color={colors.ui.unactiveTennisBall}
                    icon="tennis-ball"
                  />
                );
              })}
            </TennisBallsContainer>
          </Spacer>
        </>
      )}
    </>
  );
};
