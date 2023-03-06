import React, { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import { RankListRootStackParamList } from "../../../../infrastructure/navigation/rank-list.navigator";

type PlayerDetailsScreenProps = NativeStackScreenProps<
  RankListRootStackParamList,
  "PlayerDetails"
>;

export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;
  return (
    <View>
      <Text variant="body">Player Details {id}</Text>
    </View>
  );
};
