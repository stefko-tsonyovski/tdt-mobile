import React, { useState } from "react";
import { View } from "react-native";
import { Button, IconButton, Dialog, Portal } from "react-native-paper";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";

export const AddPrediction = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <IconButton
        icon="plus-circle"
        color={colors.bg.primary}
        onPress={showDialog}
      />
    </View>
  );
};
