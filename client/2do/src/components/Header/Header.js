import React from "react";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import FilterTaskModal from "../Modals/FilterTaskModal/FilterTaskModal";
import style from "./Header.module.scss";
import Images from "../../assets/img/images.js";

const Header = () => {
  const { showModal } = useModal();

  const openFiterModalHandler = () => {
    const initialState = {
      onFilter: (data) => filterHandler(data),
    };
    showModal(FilterTaskModal, initialState, { destroyOnClose: true });
  };

  const filterHandler = (data) => {
    console.log({ data });
  };

  return (
    <>
      <div className={style.headerComponentWrapper}>
        {/* <img src={Images.Logo} alt="filter" className="filterImg" /> */}
        <div className={style.titleBox}>
          <div>
            <span className={style.title}>Personal</span>
          </div>
          <div className={style.filterBtnBox}>
            <Button className={style.filterBtn} variant="outlined" onClick={openFiterModalHandler}>
              <img src={Images.FilterSVG} alt="filter" className="filterImg" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
