import React, { useState } from "react";
import { Button, Icon } from "@mui/material";
import FilterTaskModal from "../Modals/FilterTaskModal";
import style from "./Header.module.scss";
import Images from "../../assets/img/images.js";

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
      <div className={style.headerComponentWrapper}>
        <div className={style.titleBox}>
          <div>
            <span className={style.title}>work list</span>
          </div>
          <div className={style.filterBtnBox}>
            <Button className={style.filterBtn} variant="outlined" onClick={openFiterModalHandler}>
              <img src={Images.FilterSVG} alt="filter" className="filterImg" />
            </Button>
            <FilterTaskModal selectedValue={selectedValue} open={open} onClose={closeFiterModalHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
