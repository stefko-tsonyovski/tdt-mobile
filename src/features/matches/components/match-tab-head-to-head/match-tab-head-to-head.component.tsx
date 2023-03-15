import React, { FC } from "react";
import { useAtom } from "jotai";
import { Text } from "../../../../components/typography/text.component";
import { useLastMatchesByPlayer } from "../../../../services/matches/matches.service";
import { LastMatchesList } from "../last-matches-list/last-matches-list.component";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { HeadToHeadMatchesList } from "../head-to-head-matches-list/head-to-head-matches-list.component";
import { SurfaceFilter } from "../../../../components/surface-filter/surface-filter.component";
import { Spacer } from "../../../../components/spacer/spacer.component";

type MatchHeadToHeadProps = {
  id: number;
  homeId: number;
  awayId: number;
};

export const MatchTabHeadToHead: FC<MatchHeadToHeadProps> = ({
  id,
  homeId,
  awayId,
}) => {
  const players = [homeId, awayId];
  const renderItem = ({ item }: { item: number }) => {
    return (
      <Spacer position="top" size="large">
        <LastMatchesList matchId={id} playerId={item} />
      </Spacer>
    );
  };
  const keyExtractor = (item: number) => item.toString();

  return (
    <>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={SurfaceFilter}
        ListFooterComponent={
          <Spacer position="top" size="large">
            <HeadToHeadMatchesList
              matchId={id}
              homeId={homeId}
              awayId={awayId}
            />
          </Spacer>
        }
      />
    </>
  );
};
