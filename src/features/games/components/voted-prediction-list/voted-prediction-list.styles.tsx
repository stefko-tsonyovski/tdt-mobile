import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const ListHeading = styled(Text)`
  text-align: center;
  color: ${(props) => props.theme.colors.bg.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
`;
