import { useEffect, useState } from "react";
import moment from "moment";
import { Box } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./DateTimeSelector.scss";

interface Props {
  isEdit: boolean;
  dateAndTime?: Date | string;
  onSetDateTime: (dateTime: Date) => void;
}

const DateTimeSelector = ({ isEdit, dateAndTime, onSetDateTime }: Props) => {
  const [selectedMoment, setSelectedMoment] = useState<moment.Moment>(moment());

  useEffect(() => {
    if (isEdit && dateAndTime) {
      setSelectedMoment(moment(dateAndTime));
    } else {
      onSetDateTime(selectedMoment.toDate());
    }
  }, [isEdit, dateAndTime]);

  const handleDateTimePickerChange = (newValue: moment.Moment | null) => {
    if (newValue) {
      const selectedDateTime = newValue.toDate();
      onSetDateTime(selectedDateTime);
      setSelectedMoment(newValue);
    }
  };

  return (
    <Box className="setDateTimeComponentWrapper">
      <span className="commonLabel">Set Date &#38; Time</span>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          format="DD/MMM/YYYY hh:mm A"
          value={selectedMoment}
          onChange={handleDateTimePickerChange}
          slotProps={{ textField: { variant: "outlined" } }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateTimeSelector;
