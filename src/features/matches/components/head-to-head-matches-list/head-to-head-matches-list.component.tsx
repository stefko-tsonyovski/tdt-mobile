import React, { FC, useCallback, useContext } from "react";
import { useAtom } from "jotai";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import {
  MatchCardViewModel,
  useLastH2HMatchesByPlayer,
} from "../../../../services/matches/matches.service";
import { MatchCard } from "../match-card/match-card.component";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Divider } from "react-native-paper";
import { LastMatchCard } from "../last-match-card/last-match-card.component";
import { selectedSurfaceAtom } from "../../../../utils/atoms";

type HeadToHeadMatchesListProps = {
  matchId: number;
  homeId: number;
  awayId: number;
};

export const HeadToHeadMatchesList: FC<HeadToHeadMatchesListProps> = ({
  matchId,
  homeId,
  awayId,
}) => {
  const [surface] = useAtom(selectedSurfaceAtom);
  const { user } = useContext(AuthenticationContext);

  const { data, isLoading } = useLastH2HMatchesByPlayer(
    {
      skipMatchId: matchId,
      homeId,
      awayId,
      surface,
    },
    user?.email
  );

  const renderItem = useCallback(
    ({ item }: { item: MatchCardViewModel }) => {
      return <LastMatchCard match={item} />;
    },
    [data]
  );
  const keyExtractor = useCallback(
    (item: MatchCardViewModel) => item.id.toString(),
    [data]
  );
  return (
    <View>
      {!isLoading && data ? (
        data.matches &&
        data.matches.length > 0 && (
          <View>
            <Spacer position="bottom" size="medium">
              <Text variant="body">Matches H2H</Text>
            </Spacer>
            <FlatList
              initialNumToRender={2}
              maxToRenderPerBatch={4}
              data={data.matches}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        )
      ) : (
        <Text variant="body">Loading...</Text>
      )}
    </View>
  );
};
