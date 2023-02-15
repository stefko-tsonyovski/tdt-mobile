import { View } from "react-native";
import { Card } from "react-native-paper";
import { PlayButton } from "../../../../components/buttons/play-button/play-button.component";
import { CardFooter } from "../../../../components/card-footer/card-footer.styles";
import { styles } from "../../../../utils/styles";
import {
  FullWidthPressable,
  GameDescription,
  GameTitle,
  TextContainer,
} from "../fantasy-game-card/fantasy-game-card.styles";
import { BracketGameCardContainer } from "./bracket-game-card.styles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import React, { FC } from "react";

export type GamesScreenProps = NativeStackScreenProps<
  GamesRootStackParamList,
  "GamesMain"
>;

export const BracketGameCard: FC<GamesScreenProps> = ({ navigation }) => {
  return (
    <BracketGameCardContainer>
      <Card.Cover
        source={{
          uri: "https://res.cloudinary.com/dcvkhhwth/image/upload/v1675945387/download_bahhtw.jpg",
        }}
      />
      <CardFooter>
        <FullWidthPressable onPress={() => navigation.navigate("BracketGame")}>
          <PlayButton />
        </FullWidthPressable>
      </CardFooter>
      <TextContainer>
        <View>
          <GameTitle style={styles.textShadow} variant="body">
            BRACKET
          </GameTitle>
        </View>
        <View>
          <GameDescription style={styles.textShadow} variant="body">
            PREDICT THE OUTCOME OF TOURNAMENTS
          </GameDescription>
        </View>
      </TextContainer>
    </BracketGameCardContainer>
  );
};
