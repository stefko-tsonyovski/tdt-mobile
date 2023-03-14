import React, { FC } from "react";
import { Text } from "../typography/text.component";
import { Divider } from "react-native-paper";
import { NoDataContainer } from "./no-data.styles";
import { Spacer } from "../spacer/spacer.component";

type NoDataProps = {
  message: string;
};

export const NoData: FC<NoDataProps> = ({ message }) => {
  return (
    <Spacer position="top" size="large">
      <>
        <Divider />
        <NoDataContainer>
          <Text textAlign="center">{message}</Text>
        </NoDataContainer>
        <Divider />
      </>
    </Spacer>
  );
};
