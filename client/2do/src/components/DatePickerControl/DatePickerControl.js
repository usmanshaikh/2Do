import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "./DatePickerControl.scss";

const DatePickerControl = () => {
  const [value, setValue] = React.useState(null);

  const minY = moment().startOf("year").format("YYYY-MM-DD");
  const maxY = moment().endOf("year").format("YYYY-MM-DD");
  const calendarMaxDate = moment(new Date(maxY), "DD/MM/YYYY");
  const calendarMinDate = moment(new Date(minY), "DD/MM/YYYY");

  return (
    <>
      <div className="calendarComponentWrapper">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Select Date"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            maxDate={calendarMaxDate}
            minDate={calendarMinDate}
            fullWidth
            inputFormat="DD/MM/YYYY"
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
