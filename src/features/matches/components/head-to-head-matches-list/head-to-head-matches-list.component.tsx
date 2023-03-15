import React, { FC, useContext } from "react";
import { useAtom } from "jotai";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import {
  MatchCardViewModel,
  useLastH2HMatchesByPlayer,
} from "../../../../services/matches/matches.service";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { LastMatchCard } from "../last-match-card/last-match-card.component";
import { selectedSurfaceAtom } from "../../../../utils/atoms";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TournamentsRootStackParamList } from "../../../../infrastructure/navigation/tournaments.navigator";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";
import { NoData } from "../../../../components/no-data/no-data.component";

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
  const navigation =
    useNavigation<NavigationProp<TournamentsRootStackParamList>>();
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

  const renderItem = ({ item }: { item: MatchCardViewModel }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MatchDetails", { matchId: item.id })
        }
      >
        <LastMatchCard match={item} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: MatchCardViewModel) => item.id.toString();

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <View>
      <Text variant="body">Head To Head matches</Text>
      {data.matches && data.matches.length > 0 ? (
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
      ) : (
        <NoData message="No Head2Head Matches" />
      )}
    </View>
  );
};
