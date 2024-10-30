import { Box, Icon } from "@mui/material";
import moment from "moment";
import "./DateTime.scss";

/**
 * @param {{ dateAndTime: Date, alert:boolean}} props
 */
const DateTime = (props) => {
  const { dateAndTime, alert } = props;
  const time = moment(dateAndTime).format("hh:mm a");
  const date = moment(dateAndTime).format("DD MMM YYYY");

  return (
    <>
      <Box className="dateTimeComponentWrapper">
        {alert && <Icon className="alarmIcon material-icons-round">alarm</Icon>}
        <p className="dateTimeTxtWrap">
          <span className="dateTime">{time}</span>
          <span className="dateTime">&nbsp;-&nbsp;</span>
          <span className="dateTime">{date}</span>
        </p>
      </Box>
    </>
  );
};

export default DateTime;
