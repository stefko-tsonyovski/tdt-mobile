import React from "react";
import { Text } from "../../../../components/typography/text.component";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { PredictionsWithoutAnswerList } from "../../components/predictions-without-asnwer-list/predictions-without-answer-list.component";

export const PredictionsWithoutAnswerScreen = () => {
  return (
    <FantasyGameScreenContainer>
      <PredictionsWithoutAnswerList />
    </FantasyGameScreenContainer>
  );
};
