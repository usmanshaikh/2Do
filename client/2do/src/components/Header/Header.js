import React, { useState } from "react";
import { Button, Icon } from "@mui/material";
import FilterTaskModal from "../Modals/FilterTaskModal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("usman");

  const openFiterModalHandler = () => {
    setOpen(true);
  };

  const closeFiterModalHandler = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <div>
        <div>
          <div>
            <span>work list</span>
          </div>
          <div>
            <Button variant="outlined" onClick={openFiterModalHandler}>
              <Icon>tune</Icon>
            </Button>
            <FilterTaskModal selectedValue={selectedValue} open={open} onClose={closeFiterModalHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
