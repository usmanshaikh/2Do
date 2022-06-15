import React from "react";
import { Button, Icon } from "@mui/material";
import { truncateString } from "../../utils/Helpers/Helpers";
import "./CheckboxCard.scss";

const CheckboxCard = () => {
  return (
    <>
      <div className="checkboxCardComponentWrapper">
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
          <Button variant="text">
            <span className="seeMoreTxt numberReg">+2 more</span>
            <Icon className="arrowRightIcon">keyboard_double_arrow_right</Icon>
          </Button>
        </div>
      </div>
      <div className="checkboxCardComponentWrapper">
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
      </div>
      <div className="checkboxCardComponentWrapper">
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
          <Button variant="text">
            <span className="seeMoreTxt numberReg">+12 more</span>
            <Icon className="arrowRightIcon">keyboard_double_arrow_right</Icon>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckboxCard;
