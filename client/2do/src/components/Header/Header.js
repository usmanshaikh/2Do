import React from "react";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { useLocation } from "react-router-dom";
import { FilterTaskModal } from "../Modals";
import { useGlobalContext } from "../../utils/hooks";
import Images from "../../assets/img";
import constants from "../../utils/constants";
import "./Header.scss";

const ROUTE = constants.routePath;

const Header = () => {
  const location = useLocation();
  const { showModal } = useModal();
  const { headerTitle: title, filterOptions } = useGlobalContext();
  let isShowFilterBtn = false;

  const openFiterModalHandler = () => {
    showModal(FilterTaskModal, undefined, { destroyOnClose: true });
  };

  if (location.pathname === `/${ROUTE.TASK}` || location.pathname === `/${ROUTE.CHECKLIST}`) isShowFilterBtn = true;

  return (
    <>
      <div className="headerComponentWrapper" style={{ backgroundColor: filterOptions.categoryColor }}>
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
