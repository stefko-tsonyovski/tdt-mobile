import { useGetTotal as useTotalTeamPoints } from "../../../../services/players/players.service";
import { useGetTotal as useTotalBracketPoints } from "../../../../services/picks/picks.service";
import { useGetTotal as useTotalPredictionPoints } from "../../../../services/predictions/predictions.service";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { View } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import {
  DashboardHeader,
  DashboardTitleContainer,
  PointsContainer,
} from "./dashboard.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { PointsCircle } from "./points-circle/points-circle.component";
import { colors } from "../../../../infrastructure/theme/colors";
import Spinner from "react-native-loading-spinner-overlay";

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
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <DashboardHeader>
            <DashboardTitleContainer>
              <Text variant="body">DASHBOARD</Text>
            </DashboardTitleContainer>
            <View>
              <Text variant="body">
                TOTAL:{" "}
                {(
                  Number(teamPoints) +
                  Number(bracketPoints) +
                  Number(predictionPoints)
                ).toFixed(0)}
              </Text>
            </View>
          </DashboardHeader>
          <Spacer position="top" size="large">
            <PointsContainer>
              <View>
                <PointsCircle
                  color={colors.bg.secondary}
                  text="TEAM"
                  points={Number(teamPoints)}
                />
              </View>
              <Spacer position="left" size="xxl">
                <PointsCircle
                  color={colors.ui.predict}
                  text="PREDICT"
                  points={Number(predictionPoints)}
                />
              </Spacer>
              <Spacer position="left" size="xxl">
                <PointsCircle
                  color={colors.bg.primary}
                  text="BRACKET"
                  points={Number(bracketPoints)}
                />
              </Spacer>
            </PointsContainer>
          </Spacer>
        </>
      )}
    </>
  );
};
