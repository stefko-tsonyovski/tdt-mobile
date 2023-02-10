import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../../components/typography/text.component";

export type CircleProps = {
  color: string;
};

export const Circle = styled(View)<CircleProps>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-color: ${({ color }) => color};
  border-width: 2px;
`;

export const TextContainer = styled(View)`
  justify-content: center;
  height: 100%;
`;

export const CircleText = styled(Text)<CircleProps>`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${({ color }) => color};
`;
