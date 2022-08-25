import React from "react";
import { CardActionArea, Card } from "@mui/material";
import { addLeadingZero } from "../../../utils/Helpers";
import "./CategoryCard.scss";

/**
 * @param {{ color: string, title: string, taskCount: number, checklistCount: number, onCategory: () }} props
 */
const CategoryCard = (props) => {
  let { color, title, taskCount, checklistCount, onCategory } = props;

  taskCount = addLeadingZero(taskCount);
  checklistCount = addLeadingZero(checklistCount);

  return (
    <>
      <Card className="categoryCardComponentWrapper">
        <CardActionArea>
          <div className="cardWrap" onClick={() => onCategory()}>
            <span className="circle" style={{ backgroundColor: `${color}` }}></span>
            <span className="title">{title}</span>
            <span className="count-info">
              <span className="count">{taskCount}</span> Tasks
            </span>
            <span className="count-info">
              <span className="count">{checklistCount}</span> Checklists
            </span>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CategoryCard;
