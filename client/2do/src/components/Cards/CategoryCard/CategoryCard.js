import React from "react";
import { CardActionArea, Card } from "@mui/material";
import { addLeadingZero } from "../../../utils/Helpers/Helpers";
import "./CategoryCard.scss";

/**
 *
 * @param {{ color: string, title: string, taskCount: number, checkListCount: number, onCategory: () }} props
 */

const CategoryCard = (props) => {
  let { color, title, taskCount, checkListCount, onCategory } = props;

  taskCount = addLeadingZero(taskCount);
  checkListCount = addLeadingZero(checkListCount);

  return (
    <>
      <Card className="categoryCardComponentWrapper">
        <CardActionArea>
          <div className="cardWrap" onClick={() => onCategory(title)}>
            <span className="circle" style={{ backgroundColor: `${color}` }}></span>
            <span className="title">{title}</span>
            <span className="count-info">
              <span className="count">{taskCount}</span> Tasks
            </span>
            <span className="count-info">
              <span className="count">{checkListCount}</span> Check List
            </span>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CategoryCard;
