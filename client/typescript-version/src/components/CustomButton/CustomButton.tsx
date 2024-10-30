import { Box, Button } from "@mui/material";
import "./CustomButton.scss";

/**
 * @param {{ color: ('white'|'red'|'blue'|'danger'|'transparent'), size: ('small'|'large'), disabled: boolean, type: string, isPadding: boolean, name: string, onClick: () }} props
 */
const CustomButton = (props) => {
  const {
    color = "red",
    name = "name",
    size = "large",
    disabled = false,
    onClick,
    type = "button",
    isPadding = false,
  } = props;

  const onButtonClick = () => {
    if (onClick) onClick();
  };

  return (
    <Box className={`customButtonComponentWrapper ${isPadding ? "pd15" : null}`}>
      <Button
        variant="contained"
        type={type}
        disabled={disabled}
        className={`commonButton ${color} ${size}`}
        onClick={onButtonClick}>
        {name}
      </Button>
    </Box>
  );
};
export default CustomButton;
