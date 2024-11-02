import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import "./MarkAsComplete.scss";

interface Props {
  isEdit: boolean;
  isCompleted?: boolean;
  onChangeStatus: (isCompleted: boolean) => void;
}

const MarkAsComplete = ({ isEdit, isCompleted, onChangeStatus }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit) {
      setIsChecked(isCompleted ?? false);
    } else {
      onChangeStatus(isChecked);
    }
  }, [isEdit, isCompleted]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChangeStatus(isChecked);
    setIsChecked(isChecked);
  };

  return (
    <Box className="markAsCompleteComponentWrapper">
      <FormControlLabel
        control={
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} inputProps={{ "aria-label": "controlled" }} />
        }
        label="Mark As Complete"
      />
    </Box>
  );
};

export default MarkAsComplete;
