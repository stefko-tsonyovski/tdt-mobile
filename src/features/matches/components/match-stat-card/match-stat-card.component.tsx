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
  return (
    <>
      <Text variant="body">{statName}</Text>
      <Spacer position="top" size="small">
        <View></View>
      </Spacer>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Spacer position="right" size="medium">
            <>
              <Text style={{ textAlign: "center" }} variant="body">
                {homeStat}
              </Text>
              <ProgressBar
                style={{ transform: [{ rotate: "180deg" }], height: 10 }}
                progress={homeStat === 0 ? 1 : homeStat}
                color={
                  statName === "Aces" || statName === "Winners"
                    ? Number(homeStat) > Number(awayStat)
                      ? Colors.red500
                      : Colors.black
                    : Number(homeStat) < Number(awayStat)
                    ? Colors.red500
                    : Colors.black
                }
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
            progress={awayStat === 0 ? 1 : awayStat}
            color={
              statName === "Aces" || statName === "Winners"
                ? Number(homeStat) < Number(awayStat)
                  ? Colors.red500
                  : Colors.black
                : Number(homeStat) > Number(awayStat)
                ? Colors.red500
                : Colors.black
            }
          />
        </View>
      </View>
    </>
  );
};
