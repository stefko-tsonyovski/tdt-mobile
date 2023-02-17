import React, { FC } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { TournamentsList } from "../components/tournaments-list/tournaments-list.component";
import { TournamentsFilter } from "../components/tournaments-filter/tournaments-filter.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TournamentsRootStackParamList } from "../../../infrastructure/navigation/tournaments.navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TournamentsScreenProps = NativeStackScreenProps<
  TournamentsRootStackParamList,
  "AllTournaments"
>;

export const TournamentsScreen: FC<TournamentsScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeArea>
      <TournamentsFilter />
      <Spacer position="top" size="large">
        <TournamentsList navigation={navigation} />
      </Spacer>
    </SafeArea>
  );
};
