import { Text } from "../../../../components/typography/text.component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PredictionsGameRootStackParamList } from "../../../../infrastructure/navigation/predictions-game.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import React, { FC, useContext, useState } from "react";
import { FantasyGameScreenContainer } from "../../components/games.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { PREDICTION_CONTENT_MAX_LENGTH } from "../../../../utils/constants";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCreatePrediction } from "../../../../services/predictions/predictions.service";

export type PredictionsGameScreenProps = NativeStackScreenProps<
  PredictionsGameRootStackParamList,
  "AddPrediction"
>;

export const AddPredictionScreen: FC<PredictionsGameScreenProps> = ({
  navigation,
  route,
}) => {
  const { mutate: createPrediction } = useCreatePrediction();

  const { user } = useContext(AuthenticationContext);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const inputModel = {
      content: text,
      email: user.email,
    };

    createPrediction(inputModel);
    navigation.navigate("PredictionsMain");
  };

  return (
    <FantasyGameScreenContainer>
      <ScrollView showsVerticalScrollIndicator>
        <Text
          style={{
            textAlign: "center",
            color: colors.bg.primary,
            fontSize: 20,
          }}
          variant="body"
        >
          SUBMIT A PREDICTION
        </Text>

        <Spacer position="top" size="large">
          <View></View>
        </Spacer>

        <TextInput
          mode="outlined"
          multiline
          numberOfLines={9}
          placeholder="Type prediction text here..."
          value={text}
          maxLength={PREDICTION_CONTENT_MAX_LENGTH}
          onChangeText={(text) => setText(text)}
        />

        <Text
          style={{
            textAlign: "right",
          }}
          variant="body"
        >
          {text.length} / {PREDICTION_CONTENT_MAX_LENGTH}
        </Text>

        <Spacer position="top" size="large">
          <View></View>
        </Spacer>

        <Text
          style={{
            textAlign: "center",
            color: colors.bg.primary,
          }}
          variant="body"
        >
          EXAMPLE PREDICTIONS:
        </Text>

        <Spacer position="top" size="large">
          <View></View>
        </Spacer>

        <View
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 15,
            padding: 10,
          }}
        >
          <Text style={{ color: colors.text.inverse }} variant="body">
            Novak Djokovic will win Australian Open
          </Text>
        </View>

        <Spacer position="top" size="medium">
          <View></View>
        </Spacer>

        <View
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 15,
            padding: 10,
          }}
        >
          <Text style={{ color: colors.text.inverse }} variant="body">
            Nadal and Medvedev will play five sets
          </Text>
        </View>

        <Spacer position="top" size="medium">
          <View></View>
        </Spacer>

        <View
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 15,
            padding: 10,
          }}
        >
          <Text style={{ color: colors.text.inverse }} variant="body">
            John Isner will make at least 20 aces today
          </Text>
        </View>

        <Spacer position="top" size="xl">
          <View></View>
        </Spacer>

        {text ? (
          <Button
            onPress={handleSubmit}
            style={{ borderColor: colors.bg.primary, borderRadius: 15 }}
            color={colors.bg.primary}
            mode="outlined"
          >
            SUBMIT
          </Button>
        ) : (
          <Button
            style={{ borderColor: colors.bg.primary, borderRadius: 15 }}
            onPress={() => navigation.navigate("PredictionsMain")}
            color={colors.bg.primary}
            mode="outlined"
          >
            CANCEL
          </Button>
        )}
      </ScrollView>
    </FantasyGameScreenContainer>
  );
};
