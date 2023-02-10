import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export type CircleProps = {
  color: string;
};

export const Circle = styled(View)<CircleProps>`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-color: ${({ color }) => color};
  border-width: 2px;
  background-color: ${({ color }) => color};
`;

export const TextContainer = styled(View)`
  justify-content: center;
  height: 100%;
`;

export const CircleText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const UnderCircleText = styled(Text)<CircleProps>`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${({ color }) => color};
`;
