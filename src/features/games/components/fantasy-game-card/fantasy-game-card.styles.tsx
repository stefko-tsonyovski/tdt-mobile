import { Pressable, View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";
import { Title } from "../../../account/components/account.styles";

export const TextContainer = styled(View)`
  position: absolute;
  bottom: 50%;
`;

export const GameTitle = styled(Title)`
  text-align: center;
  margin-left: 25px;
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const GameDescription = styled(Text)`
  text-align: center;
  margin-left: 25px;
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const FullWidthPressable = styled(Pressable)`
  width: 100%;
`;
