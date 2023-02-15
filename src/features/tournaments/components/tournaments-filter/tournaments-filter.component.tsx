import { useState } from "react";
import { useAtom } from "jotai";
import { Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { selectedDateAtom } from "../../../../utils/atoms";

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
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(date)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
