import { View } from "react-native";
import { Card } from "react-native-paper";
import { PlayButton } from "../../../../components/buttons/play-button/play-button.component";
import { CardFooter } from "../../../../components/card-footer/card-footer.styles";
import { styles } from "../../../../utils/styles";
import {
  GameDescription,
  GameTitle,
  TextContainer,
} from "./fantasy-game-card.styles";

export const FantasyGameCard = () => {
  return (
    <Card>
      <Card.Cover
        source={{
          uri: "https://res.cloudinary.com/dcvkhhwth/image/upload/v1675945387/2018-05-25-tennis-balls-500x250_twhuj2.jpg",
        }}
      />
      <CardFooter>
        <PlayButton />
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
