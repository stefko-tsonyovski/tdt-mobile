import React, { FC } from "react";
import { FlatList } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RankListRootStackParamList } from "../../../../infrastructure/navigation/rank-list.navigator";
import { useSinglePlayer } from "../../../../services/players/players.service";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PlayerResults } from "../../components/player-results/player-results.component";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";
import { PlayerHeadingCard } from "../../components/player-heading-card/player-heading-card.component";

type PlayerDetailsScreenProps = NativeStackScreenProps<
  RankListRootStackParamList,
  "PlayerDetails"
>;

export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = ({
  route,
}) => {
  const { playerId } = route.params;

  const { data, isLoading } = useSinglePlayer(playerId);

  if (isLoading || !data) {
    return (
      <Spinner visible={true} textStyle={{ color: colors.text.inverse }} />
    );
  }

  const {
    player: { name, gender, countryKey, ranking, imageUrl },
  } = data;

  return (
    <>
      <Spacer position="top" size="large">
        <FlatList
          ListHeaderComponent={
            <PlayerHeadingCard
              name={name}
              gender={gender}
              countryKey={countryKey}
              ranking={ranking}
              imageUrl={imageUrl}
            />
          }
          data={[]}
          renderItem={null}
          ListFooterComponent={<PlayerResults playerId={playerId} />}
        />
      </Spacer>
    </>
  );
};
