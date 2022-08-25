import React, { Fragment } from "react";
import { Icon, CardActionArea, Card } from "@mui/material";
import { truncateString } from "../../../utils/Helpers";
import DateTime from "../../DateTime/DateTime";
import "./ChecklistCard.scss";

const ChecklistCard = (props) => {
  const { checklists, editChecklist } = props;

  return (
    <>
      {checklists.map((item) => {
        return (
          <Fragment key={item?.id}>
            <Card className="checklistCardComponentWrapper" onClick={() => editChecklist(item)}>
              <CardActionArea>
                <div className="cardWrap">
                  <span className="bgLine" style={{ backgroundColor: item?.cardColor?.color }}></span>
                  <span className="heading">{truncateString(item?.title, 80)}</span>
                  <ul className="listItemWrap">
                    {item?.checklistItems.slice(0, 3).map((listItem) => {
                      return (
                        <li key={listItem?.id} className={`item searchDiv ${listItem?.isChecked ? "complete" : null}`}>
                          {listItem?.isChecked ? (
                            <Icon className="checkboxIcon checked">check_box</Icon>
                          ) : (
                            <Icon className="checkboxIcon unChecked">check_box_outline_blank</Icon>
                          )}
                          <span className="description">{truncateString(listItem?.text)}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {item?.checklistItems.length > 3 && (
                    <div className="seeMoreWrap">
                      <span className="seeMoreTxt">+{item?.checklistItems.length - 3} more</span>
                      <Icon className="arrowRightIcon">keyboard_double_arrow_right</Icon>
                    </div>
                  )}
                  <div className="dateTimeWrap">
                    <DateTime dateAndTime={item?.dateAndTime} alert={item?.alert} />
                  </div>
                </div>
              </CardActionArea>
            </Card>
          </Fragment>
        );
      })}
    </>
  );
};

export default ChecklistCard;
