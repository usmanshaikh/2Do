import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import moment from "moment";
import "./DatePickerControl.scss";

const DatePickerControl = (props) => {
  const { onSelectDate } = props;
  const [datePicker, setDatePicker] = useState<any>(null);

  const minY = moment().startOf("year").format("YYYY-MM-DD");
  const maxY = moment().endOf("year").format("YYYY-MM-DD");
  const calendarMaxDate = moment(new Date(maxY), "DD/MM/YYYY");
  const calendarMinDate = moment(new Date(minY), "DD/MM/YYYY");

  const onSelectDateHandler = (selectedData) => {
    setDatePicker(moment(selectedData));
  };

  const onOkHandler = () => {
    onSelectDate(datePicker);
  };

  const onClearDateHandler = () => {
    setDatePicker(null);
    onSelectDate(undefined);
  };

  return (
    <>
      <Box className="calendarComponentWrapper">
        {datePicker && (
          <Box className="clearBtnWrap">
            <Icon className="clearIcon" onClick={onClearDateHandler}>
              clear
            </Icon>
          </Box>
        )}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            // error={false}
            label="Select Date"
            openTo="day"
            value={datePicker}
            onChange={(selectedData) => onSelectDateHandler(selectedData)}
            onAccept={onOkHandler}
            maxDate={calendarMaxDate}
            minDate={calendarMinDate}
            // fullWidth
            // inputFormat="DD/MMM/YYYY"
            // renderInput={(params) => (
            //   <TextField className="datePickerInputControl" fullWidth placeholder="DD/MM/YYYY" {...params} />
            // )}
          />
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default DatePickerControl;
