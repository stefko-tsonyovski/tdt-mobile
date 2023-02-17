import React from "react";
import { useState } from "react";
import { useAtom } from "jotai";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { selectedDateAtom } from "../../../../utils/atoms";
import { Text } from "../../../../components/typography/text.component";
import { Button, Colors } from "react-native-paper";
import { DateText } from "./tournaments-filter.styles";

export const TournamentsFilter = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useAtom(selectedDateAtom);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const parsedDate = date.toLocaleDateString("en-CA");
    setDate(parsedDate);
    hideDatePicker();
  };

  return (
    <>
      <Button mode="text" color={Colors.black} onPress={showDatePicker}>
        {date}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(date)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        style={{}}
      />
    </>
  );
};
