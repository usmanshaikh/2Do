import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "./DatePickerControl.scss";

const DatePickerControl = (props) => {
  const { selectedDate } = props;
  const [datePicker, setDatePicker] = React.useState(null);

  const minY = moment().startOf("year").format("YYYY-MM-DD");
  const maxY = moment().endOf("year").format("YYYY-MM-DD");
  const calendarMaxDate = moment(new Date(maxY), "DD/MM/YYYY");
  const calendarMinDate = moment(new Date(minY), "DD/MM/YYYY");

  const onSelectDateHandler = (selectedData) => {
    const dateAndTime = moment(selectedData).toDate();
    setDatePicker(dateAndTime);
  };

  const onOkHandler = () => {
    const obj = { dateAndTime: datePicker };
    selectedDate(obj);
  };

  return (
    <>
      <div className="calendarComponentWrapper">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            error={false}
            label="Select Date"
            openTo="day"
            value={datePicker}
            onChange={(selectedData) => onSelectDateHandler(selectedData)}
            onAccept={onOkHandler}
            maxDate={calendarMaxDate}
            minDate={calendarMinDate}
            fullWidth
            inputFormat="DD/MMM/YYYY"
            renderInput={(params) => (
              <TextField className="datePickerInputControl" fullWidth placeholder="DD/MM/YYYY" {...params} />
            )}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default DatePickerControl;
