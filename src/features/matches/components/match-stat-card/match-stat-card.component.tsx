import React, { FC } from "react";
import { View } from "react-native";
import { Colors, ProgressBar } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";

type MatchStatCardProps = {
  statName: string;
  homeStat?: number;
  awayStat?: number;
};

export const MatchStatCard: FC<MatchStatCardProps> = ({
  statName,
  homeStat,
  awayStat,
}) => {
  if (!homeStat || !awayStat) {
    return <Text variant="body"> No {statName} stats</Text>;
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Spacer position="right" size="medium">
          <>
            <Text style={{ textAlign: "center" }} variant="body">
              {homeStat}
            </Text>
            <ProgressBar
              style={{ transform: [{ rotate: "180deg" }], height: 10 }}
              progress={homeStat}
              color={homeStat > awayStat ? Colors.red500 : Colors.black}
            />
          </>
        </Spacer>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ textAlign: "center" }} variant="body">
          {awayStat}
        </Text>
        <ProgressBar
          style={{ height: 10 }}
          progress={awayStat}
          color={awayStat > homeStat ? Colors.red500 : Colors.black}
        />
      </View>
    </View>
  );
};
