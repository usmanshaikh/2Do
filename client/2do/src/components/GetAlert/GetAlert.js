import React, { useEffect, useState } from "react";
import { Icon, Popover } from "@mui/material";
import Switch from "@mui/material/Switch";
import constants from "../../utils/constants";
import "./GetAlert.scss";

const MSG = constants.message;

const GetAlert = (props) => {
  const { isEdit, alert, onAlert } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (isEdit) setChecked(alert);
    else defaultCompValueIfNotEdit();
  }, [alert]);

  const handleChange = (event) => {
    const check = event.target.checked;
    const obj = { alert: check };
    onAlert(obj);
    setChecked(check);
  };

  const defaultCompValueIfNotEdit = () => {
    const obj = { alert: checked };
    onAlert(obj);
  };

  const infoPopoverOpenHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const infoPopoverCloseHandler = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div className="getAlertComponentWrapper">
        <div className="flexContainer">
          <div className="labelInfoWrap">
            <div>
              <span className="commonLabel">Get alert for this task</span>
            </div>
            <div>
              <Icon
                className="infoIcon"
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={infoPopoverOpenHandler}
                onMouseLeave={infoPopoverCloseHandler}>
                info
              </Icon>
              <Popover
                className="infoPopoverWrapper"
                id="mouse-over-popover"
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                onClose={infoPopoverCloseHandler}
                disableRestoreFocus>
                <span>{MSG.INFO_ALERT}</span>
              </Popover>
            </div>
          </div>
          <div>
            <Switch {...label} checked={checked} onChange={handleChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAlert;
