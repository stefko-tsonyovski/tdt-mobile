import { Text } from "../../../../components/typography/text.component";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { VotedPredictionsList } from "../../components/voted-prediction-list/voted-prediction-list.component";

export const YourVotesScreen = () => {
  return (
    <FantasyGameScreenContainer>
      <VotedPredictionsList />
    </FantasyGameScreenContainer>
  );
};
