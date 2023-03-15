import React from "react";
import { useAllRounds } from "../../../../services/rounds/rounds.service";
import { RoundsList } from "../../../games/components/rounds-list/rounds-list.component";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { colors } from "../../../../infrastructure/theme/colors";

export const MatchesRoundFilter = () => {
  const { data, isLoading } = useAllRounds();

  if (isLoading || !data) {
    return (
      <Spinner
        visible={true}
        textContent="This may take a while..."
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return <RoundsList rounds={data?.rounds} />;
};
