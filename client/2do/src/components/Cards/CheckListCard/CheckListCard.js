import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon, CardActionArea, Card } from "@mui/material";
import { truncateString } from "../../../utils/Helpers/Helpers";
import DateTime from "../../DateTime/DateTime";
import * as Path from "../../../utils/constants/routePath.constants";
import "./CheckListCard.scss";

const CheckListCard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onEditCheckListHandler = () => {
    navigate(`${location.pathname}/${Path.ADD_EDIT_CHECK_LIST}`);
  };

  return (
    <>
      <Card className="checkListCardComponentWrapper" onClick={onEditCheckListHandler}>
        <CardActionArea>
          <div className="cardWrap">
            <span className="bgLine" style={{ backgroundColor: "#eb144c" }}></span>
            <span className="heading">
              {truncateString(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cupiditate ratione repellendus culpa consequuntur odio error unde, nihil ex corporis commodi iure obcaecati, similique ducimus maiores esse iste cum laudantium?",
                80
              )}
            </span>
            <ul className="listItemWrap">
              <li className="item complete">
                <Icon className="checkboxIcon unChecked">check_box_outline_blank</Icon>
                <Icon className="checkboxIcon checked">check_box</Icon>
                <span className="description">
                  {truncateString(
                    "Create component and HTML structure. Create 2Do App by using ReactJS, NodeJs and Mongodb. Create component and HTML structure. Create 2Do App by using ReactJS, NodeJs and Mongodb."
                  )}
                </span>
              </li>
              <li className="item">
                <Icon className="checkboxIcon">check_box_outline_blank</Icon>
                <span className="description">{truncateString("Buy a milk")}</span>
              </li>
              <li className="item">
                <Icon className="checkboxIcon">check_box_outline_blank</Icon>
                <span className="description">{truncateString("Buy a milk")}</span>
              </li>
            </ul>
            <div className="seeMoreWrap">
              <span className="seeMoreTxt">+2 more</span>
              <Icon className="arrowRightIcon">keyboard_double_arrow_right</Icon>
            </div>
            <div className="dateTimeWrap">
              <DateTime />
            </div>
          </div>
        </CardActionArea>
      </Card>
      <Card className="checkListCardComponentWrapper" onClick={onEditCheckListHandler}>
        <CardActionArea>
          <div className="cardWrap">
            <span className="bgLine" style={{ backgroundColor: "#0693e3" }}></span>
            <span className="heading">{truncateString("small heading string", 80)}</span>
            <ul className="listItemWrap">
              <li className="item complete">
                <Icon className="checkboxIcon unChecked">check_box_outline_blank</Icon>
                <Icon className="checkboxIcon checked">check_box</Icon>
                <span className="description">{truncateString("Create component and HTML structure.")}</span>
              </li>
              <li className="item">
                <Icon className="checkboxIcon">check_box_outline_blank</Icon>
                <span className="description">{truncateString("Buy a milk")}</span>
              </li>
              <li className="item">
                <Icon className="checkboxIcon">check_box_outline_blank</Icon>
                <span className="description">{truncateString("Buy a milk")}</span>
              </li>
            </ul>
            <div className="dateTimeWrap">
              <DateTime />
            </div>
          </div>
        </CardActionArea>
      </Card>
      <Card className="checkListCardComponentWrapper" onClick={onEditCheckListHandler}>
        <CardActionArea>
          <div className="cardWrap">
            <span className="bgLine" style={{ backgroundColor: "#00d084" }}></span>
            <span className="heading">
              {truncateString(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cupiditate ratione repellendus culpa consequuntur odio error unde, nihil ex corporis commodi iure obcaecati, similique ducimus maiores esse iste cum laudantium?",
                80
              )}
            </span>
            <ul className="listItemWrap">
              <li className="item complete">
                <Icon className="checkboxIcon unChecked">check_box_outline_blank</Icon>
                <Icon className="checkboxIcon checked">check_box</Icon>
                <span className="description">
                  {truncateString(
                    "Create component and HTML structure. Create 2Do App by using ReactJS, NodeJs and Mongodb. Create component and HTML structure. Create 2Do App by using ReactJS, NodeJs and Mongodb."
                  )}
                </span>
              </li>
              <li className="item">
                <Icon className="checkboxIcon">check_box_outline_blank</Icon>
                <span className="description">{truncateString("Buy a milk")}</span>
              </li>
              <li className="item">
                <Icon className="checkboxIcon">check_box_outline_blank</Icon>
                <span className="description">{truncateString("Buy a milk")}</span>
              </li>
            </ul>
            <div className="seeMoreWrap">
              <span className="seeMoreTxt">+12 more</span>
              <Icon className="arrowRightIcon">keyboard_double_arrow_right</Icon>
            </div>
            <div className="dateTimeWrap">
              <DateTime />
            </div>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CheckListCard;
