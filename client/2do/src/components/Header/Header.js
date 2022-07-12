import React, { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { GlobalContext } from "../../utils/contexts/GlobalContext";
import FilterTaskModal from "../Modals/FilterTaskModal/FilterTaskModal";
import Images from "../../assets/img/images.js";
import style from "./Header.module.scss";

const Header = () => {
  const { showModal } = useModal();
  const { headerTitle } = useContext(GlobalContext);
  const [title] = headerTitle;
  // const [setHeaderBtn] = headerBtn;

  const openFiterModalHandler = () => {
    const initialState = {
      onFilter: (data) => filterHandler(data),
    };
    showModal(FilterTaskModal, initialState, { destroyOnClose: true });
  };

  const filterHandler = (data) => {
    console.log({ data });
  };

  // useEffect(() => {
  //   console.log("CLICK EVENT FROM ANOTHER COMPONENT FROM GlobalContext - PASS");
  // }, [setHeaderBtn]);

  return (
    <>
      <div className={style.headerComponentWrapper}>
        <div className={style.titleBox}>
          <div>
            <span className={style.title}>{title}</span>
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
