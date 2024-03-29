import { View } from "react-native";
import { Card } from "react-native-paper";
import { PlayButton } from "../../../../components/buttons/play-button/play-button.component";
import { CardFooter } from "../../../../components/card-footer/card-footer.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { styles } from "../../../../utils/styles";
import { BracketGameCardContainer } from "../bracket-game-card/bracket-game-card.styles";
import {
  FullWidthPressable,
  GameDescription,
  GameTitle,
  TextContainer,
} from "../fantasy-game-card/fantasy-game-card.styles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import React, { FC } from "react";
export type GamesScreenProps = NativeStackScreenProps<
  GamesRootStackParamList,
  "GamesMain"
>;

export const PredictGameCard: FC<GamesScreenProps> = ({ navigation }) => {
  return (
    <BracketGameCardContainer>
      <Card.Cover
        source={{
          uri: "https://res.cloudinary.com/dcvkhhwth/image/upload/v1675945387/images_rkzxf9.jpg",
        }}
      />
      <CardFooter>
        <FullWidthPressable onPress={() => navigation.navigate("PredictGame")}>
          <PlayButton />
        </FullWidthPressable>
      </CardFooter>
      <TextContainer>
        <Spacer position="left" size="large">
          <View>
            <GameTitle style={styles.textShadow} variant="body">
              PREDICT
            </GameTitle>
          </View>
        </Spacer>
        <Spacer position="left" size="large">
          <View>
            <GameDescription style={styles.textShadow} variant="body">
              GIVE YOUR BOLD PREDICTIONS
            </GameDescription>
          </View>
        </Spacer>
      </TextContainer>
    </BracketGameCardContainer>
  );
};
