import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";
import { useWeeks } from "../../services/weeks/weeks.service";
import { useAtom } from "jotai";
import { currentTournamentAtom, selectedWeekAtom } from "../../utils/atoms";
import { Text } from "../typography/text.component";
import { INITIAL_TOURNAMENT_INDEX } from "../../utils/constants";

export const NativeMenu = () => {
  const { data: weeksObject, isLoading: isLoadingWeeks } = useWeeks();

  const options =
    !isLoadingWeeks && weeksObject
      ? weeksObject?.weeks?.map((week) => {
          const option = {
            text: week.name,
            value: week._id,
            from: week.from,
            to: week.to,
          };
          return option;
        })
      : [
          {
            text: "GW1",
            value: "63a0343ad7fba86bf211d965",
            from: "2022-12-29",
            to: "2023-01-08",
          },
        ];

  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const [, setCurrent] = useAtom(currentTournamentAtom);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {isLoadingWeeks ? (
        <Text variant="body">Loading...</Text>
      ) : (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button color={colors.text.inverse} onPress={openMenu}>
              {selectedWeek.text}
            </Button>
          }
        >
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="always"
            style={{ height: 300 }}
          >
            {options.map((option) => (
              <View key={option.value}>
                <Menu.Item
                  onPress={() => {
                    setSelectedWeek(option);
                    setCurrent(INITIAL_TOURNAMENT_INDEX);
                    closeMenu();
                  }}
                  title={option.text}
                />
                <Divider
                  style={{ height: 3, backgroundColor: colors.bg.primary }}
                />
              </View>
            ))}
          </ScrollView>
        </Menu>
      )}
    </View>
  );
};
