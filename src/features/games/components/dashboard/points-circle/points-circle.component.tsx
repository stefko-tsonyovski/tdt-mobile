import { View } from "react-native";
import { FC } from "react";
import { Text } from "../../../../../components/typography/text.component";
import { Spacer } from "../../../../../components/spacer/spacer.component";
import { fontSizes } from "../../../../../infrastructure/theme/fonts";
import { Circle, CircleText, TextContainer } from "./points-circle.styles";

export type PointsCircleProps = {
  color: string;
  text: string;
  points: number;
};

export const PointsCircle: FC<PointsCircleProps> = ({
  color,
  text,
  points,
}) => {
  return (
    <>
      <Circle color={color}>
        <TextContainer>
          <CircleText color={color} variant="body">
            {points}
          </CircleText>
        </TextContainer>
      </Circle>
      <Spacer position="top" size="large">
        <View>
          <CircleText color={color} variant="body">
            {text}
          </CircleText>
        </View>
      </Spacer>
    </>
  );
};
