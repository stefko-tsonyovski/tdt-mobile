import { useGetTotal as useTotalTeamPoints } from "../../../../services/players/players.service";
import { useGetTotal as useTotalBracketPoints } from "../../../../services/picks/picks.service";
import { useGetTotal as useTotalPredictionPoints } from "../../../../services/predictions/predictions.service";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { View } from "react-native";
import { Text } from "../../../../components/typography/text.component";

export const Dashboard = () => {
  const { user } = useContext(AuthenticationContext);

  const {
    data: teamPoints,
    isLoading: isLoadingTeam,
    error,
  } = useTotalTeamPoints(user.email);
  const { data: bracketPoints, isLoading: isLoadingBracket } =
    useTotalBracketPoints(user.email);
  const { data: predictionPoints, isLoading: isLoadingPrediction } =
    useTotalPredictionPoints(user.email);

  return (
    <>
      {isLoadingTeam || isLoadingBracket || isLoadingPrediction ? (
        ""
      ) : (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ textAlign: "left" }} variant="body">
            DASHBOARD
          </Text>
          <Text style={{ textAlign: "right" }} variant="body">
            TOTAL:{" "}
            {(
              Number(teamPoints) +
              Number(bracketPoints) +
              Number(predictionPoints)
            ).toFixed(0)}
          </Text>
        </View>
      )}
    </>
  );
};
