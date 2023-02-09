import { View } from "react-native";
import { FC } from "react";
import { Text } from "../../../../../components/typography/text.component";
import { Spacer } from "../../../../../components/spacer/spacer.component";
import { fontSizes } from "../../../../../infrastructure/theme/fonts";

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
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          borderColor: color,
          borderWidth: 2,
        }}
      >
        <View style={{ justifyContent: "center", height: "100%" }}>
          <Text
            style={{
              color,
              textAlign: "center",
              fontSize: 20,
            }}
            variant="body"
          >
            {points}
          </Text>
        </View>
      </View>
      <Spacer position="top" size="large">
        <View>
          <Text style={{ color, textAlign: "center" }} variant="body">
            {text}
          </Text>
        </View>
      </Spacer>
    </>
  );
};
