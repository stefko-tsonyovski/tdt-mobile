import { View } from "react-native";
import { FC } from "react";
import { Spacer } from "../../../../components/spacer/spacer.component";
import {
  Circle,
  CircleText,
  TextContainer,
  UnderCircleText,
} from "./stats-circle.styles";

export type StatsCircleProps = {
  color: string;
  text: string;
  points: number;
};

export const StatsCircle: FC<StatsCircleProps> = ({ color, text, points }) => {
  return (
    <>
      <Circle color={color}>
        <TextContainer>
          <CircleText variant="body">
            {text === "YOUR BALANCE" ? points + "M" : points.toFixed(0)}
          </CircleText>
        </TextContainer>
      </Circle>
      <Spacer position="top" size="large">
        <View>
          <UnderCircleText color={color} variant="body">
            {text}
          </UnderCircleText>
        </View>
      </Spacer>
    </>
  );
};
