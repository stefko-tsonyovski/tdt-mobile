import { Pressable, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { PlayButton } from "../../../../components/buttons/play-button/play-button.component";
import { CardFooter } from "../../../../components/card-footer/card-footer.styles";
import { styles } from "../../../../utils/styles";
import {
  FullWidthPressable,
  GameDescription,
  GameTitle,
  TextContainer,
} from "./fantasy-game-card.styles";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GamesRootStackParamList } from "../../../../infrastructure/navigation/games.navigator";
import { FC } from "react";

export type GamesScreenProps = NativeStackScreenProps<
  GamesRootStackParamList,
  "GamesMain"
>;

export const FantasyGameCard: FC<GamesScreenProps> = ({ navigation }) => {
  return (
    <Card>
      <Card.Cover
        source={{
          uri: "https://res.cloudinary.com/dcvkhhwth/image/upload/v1675945387/2018-05-25-tennis-balls-500x250_twhuj2.jpg",
        }}
      />
      <CardFooter>
        <FullWidthPressable onPress={() => navigation.navigate("FantasyGame")}>
          <PlayButton />
        </FullWidthPressable>
      </CardFooter>
      <TextContainer>
        <View>
          <GameTitle style={styles.textShadow} variant="body">
            TENNIS DREAM TEAM
          </GameTitle>
        </View>
        <View>
          <GameDescription style={styles.textShadow} variant="body">
            CONQUER THE TENNIS WORLD WITH YOUR DREAM TEAM
          </GameDescription>
        </View>
      </TextContainer>
    </Card>
  );
};
