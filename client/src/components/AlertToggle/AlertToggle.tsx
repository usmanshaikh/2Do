import { useEffect, useState } from "react";
import { Box, Icon, Popover } from "@mui/material";
import Switch from "@mui/material/Switch";
import { MSG } from "../../utils/constants";
import "./AlertToggle.scss";

interface Props {
  isEdit: boolean;
  alert?: boolean;
  onAlertChange: (alert: boolean) => void;
}

const AlertToggle = ({ isEdit, alert, onAlertChange }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAlertEnabled, setIsAlertEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (isEdit) {
      setIsAlertEnabled(alert ?? false);
    } else {
      setIsAlertEnabled(true);
      onAlertChange(true);
    }
  }, [isEdit, alert]);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsAlertEnabled(checked);
    onAlertChange(checked);
  };

  return (
    <Box className="alertToggleComponentWrapper">
      <Box className="flexContainer">
        <Box className="labelInfoWrap">
          <Box>
            <span className="commonLabel">Get alert for this task</span>
          </Box>
          <Box>
            <Icon
              className="infoIcon"
              aria-owns={Boolean(anchorEl) ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
              onMouseLeave={() => setAnchorEl(null)}>
              info
            </Icon>
            <Popover
              className="infoPopoverWrapper"
              id="mouse-over-popover"
              sx={{ pointerEvents: "none" }}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              onClose={() => setAnchorEl(null)}
              disableRestoreFocus>
              <span>{MSG.USER_FEEDBACK.INFO_ALERT}</span>
            </Popover>
          </Box>
        </Box>
        <Box>
          <Switch checked={isAlertEnabled} onChange={handleToggleChange} />
        </Box>
      </Box>
    </Box>
  );
};

export default AlertToggle;
