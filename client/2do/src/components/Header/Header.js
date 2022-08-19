import React from "react";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { FilterTaskModal } from "../Modals";
import { useGlobalContext } from "../../utils/hooks";
import Images from "../../assets/img/images.js";
import "./Header.scss";

const Header = () => {
  const { showModal } = useModal();
  const { headerTitle: title } = useGlobalContext();

  const openFiterModalHandler = () => {
    const initialState = {
      onFilter: (data) => filterHandler(data),
    };
    showModal(FilterTaskModal, initialState, { destroyOnClose: true });
  };

  const filterHandler = (data) => {
    console.log({ data });
  };

  const isShowFilterBtn = title !== "Category" && title !== "Profile";

  return (
    <>
      <div className="headerComponentWrapper">
        <div className="titleBox">
          <div>
            <span className="title">{title}</span>
          </div>
          {isShowFilterBtn && (
            <div className="filterBtnBox">
              <Button className="filterBtn" variant="outlined" onClick={openFiterModalHandler}>
                <img src={Images.FilterSVG} alt="filter" className="filterImg" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
