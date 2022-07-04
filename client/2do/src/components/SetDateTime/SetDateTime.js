import React, { useEffect, useState } from "react";
import moment from "moment";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./SetDateTime.scss";

const SetDateTime = (props) => {
  const [dateTime, setDateTime] = useState(moment());
  const handleChange = (newValue) => {
    setDateTime(newValue);
  };

  useEffect(() => {
    props.onSetDateTime(dateTime);
  }, [dateTime]);

  return (
    <>
      <div className="setDateTimeComponentWrapper">
        <span className="commonLabel">Set Date &#38; time</span>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            inputFormat="DD/MMM/YYYY HH:mm A"
            value={dateTime}
            onChange={handleChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default SetDateTime;
