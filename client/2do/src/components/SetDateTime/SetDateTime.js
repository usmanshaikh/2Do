import React, { useEffect, useState } from "react";
import moment from "moment";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./SetDateTime.scss";

const SetDateTime = (props) => {
  const { isEdit, dateAndTime, onSetDateTime } = props;
  const [dateTime, setDateTime] = useState(moment());

  useEffect(() => {
    if (isEdit) {
      setDateTime(moment(dateAndTime));
    } else {
      defaultCompValueIfNotEdit();
    }
  }, [dateAndTime, isEdit]);

  const handleChange = (newValue) => {
    const dt = moment(newValue).toDate();
    const obj = { dateAndTime: dt };
    onSetDateTime(obj);
    setDateTime(moment(newValue));
  };

  const defaultCompValueIfNotEdit = () => {
    const obj = { dateAndTime: dateTime.toDate() };
    onSetDateTime(obj);
  };

  return (
    <div className="setDateTimeComponentWrapper">
      <span className="commonLabel">Set Date &#38; Time</span>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          inputFormat="DD/MMM/YYYY hh:mm A"
          value={dateTime}
          onChange={handleChange}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default SetDateTime;
