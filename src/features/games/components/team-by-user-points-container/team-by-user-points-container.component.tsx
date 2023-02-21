import { useAtom } from "jotai";
import React, { FC } from "react";
import { View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import {
  useTotalByUserAndByWeek,
  useWeeklyByUserAndByWeek,
} from "../../../../services/users/users.service";
import { selectedWeekAtom } from "../../../../utils/atoms";
import { StatsCircle } from "../stats-circle/stats-circle.component";

export type TeamByUserPointsContainerProps = {
  userId: string;
};

export const TeamByUserPointsContainer: FC<TeamByUserPointsContainerProps> = ({
  userId,
}) => {
  const [selected] = useAtom(selectedWeekAtom);

  const { data: weeklyPoints, isLoading: isLoadingWeekly } =
    useWeeklyByUserAndByWeek(userId, selected.value);
  const { data: totalPoints, isLoading: isLoadingTotal } =
    useTotalByUserAndByWeek(userId, selected.value);

  return (
    <>
      {isLoadingWeekly || isLoadingTotal ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View>
            <StatsCircle
              color={colors.bg.primary}
              text={`${selected.text} POINTS`}
              points={Number(weeklyPoints?.points)}
            />
          </View>
          <Spacer position="left" size="xxl">
            <StatsCircle
              color={colors.bg.primary}
              text={`TOTAL POINTS`}
              points={Number(totalPoints?.points)}
            />
          </Spacer>
        </View>
      )}
    </>
  );
};
