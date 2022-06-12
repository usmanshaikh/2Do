import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import moment from "moment";
import "./Calendar.scss";

const Calendar = () => {
  const [value, setValue] = React.useState(new Date());

  const minY = moment().startOf("year").format("YYYY-MM-DD");
  const maxY = moment().endOf("year").format("YYYY-MM-DD");
  const calendarMaxDate = moment(new Date(maxY), "DD/MM/YYYY");
  const calendarMinDate = moment(new Date(minY), "DD/MM/YYYY");

  return (
    <>
      <div className="calendarComponentWrapper">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDatePicker
            className="usman"
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            maxDate={calendarMaxDate}
            minDate={calendarMinDate}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default Calendar;
