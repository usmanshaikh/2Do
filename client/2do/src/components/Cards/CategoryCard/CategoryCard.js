import React from "react";
import { CardActionArea, Card, Icon, IconButton } from "@mui/material";
import { addLeadingZero } from "../../../utils/Helpers";
import "./CategoryCard.scss";

/**
 * @param {{ color: string, title: string, taskCount: number, checklistCount: number, onNavigate: (), onDelete: () }} props
 */
const CategoryCard = (props) => {
  let { color, title, taskCount, checklistCount, onNavigate, onDelete } = props;

  taskCount = addLeadingZero(taskCount);
  checklistCount = addLeadingZero(checklistCount);

  const onNavigateHandler = (e) => {
    e.stopPropagation();
    onNavigate();
  };

  return (
    <>
      <Card className="categoryCardComponentWrapper">
        <IconButton className="deleteBtn" onClick={() => onDelete()}>
          <Icon className="deleteIcon">delete</Icon>
        </IconButton>
        <CardActionArea>
          <div className="cardWrap" onClick={(e) => onNavigateHandler(e)}>
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
