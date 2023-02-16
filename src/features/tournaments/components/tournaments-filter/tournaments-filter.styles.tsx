import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const DateText = styled(Text)`
  color: ${(props) => props.theme.colors.text.secondary};
  flex-direction: row;
  justify-content: center;
`;
