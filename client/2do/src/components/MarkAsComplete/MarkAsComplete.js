import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import "./MarkAsComplete.scss";

const MarkAsComplete = (props) => {
  const { isEdit, isCompleted, onChangeStatus } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isEdit) setChecked(isCompleted);
    else defaultCompValueIfNotEdit();
  }, [alert]);

  const defaultCompValueIfNotEdit = () => {
    const obj = { isCompleted: checked };
    onChangeStatus(obj);
  };

  const handleChange = (e) => {
    const check = e.target.checked;
    const obj = { isCompleted: check };
    onChangeStatus(obj);
    setChecked(check);
  };

  return (
    <>
      <div className="markAsCompleteComponentWrapper">
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
          label="Mark As Complete"
        />
      </div>
    </>
  );
};

export default MarkAsComplete;
