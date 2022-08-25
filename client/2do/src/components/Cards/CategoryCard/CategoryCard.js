import React from "react";
import { CardActionArea, Card, Icon, IconButton } from "@mui/material";
import { addLeadingZero } from "../../../utils/Helpers";
import "./CategoryCard.scss";

/**
 * @param {{ cardData: object, onNavigate: (), onDelete: () }} props
 */
const CategoryCard = (props) => {
  let { cardData, onNavigate, onDelete } = props;
  let taskCount = addLeadingZero(cardData.taskCount);
  let checklistCount = addLeadingZero(cardData.checklistCount);

  const onNavigateHandler = (e) => {
    e.stopPropagation();
    onNavigate();
  };

  return (
    <>
      <Card className="categoryCardComponentWrapper">
        {cardData.deletable && (
          <IconButton className="deleteBtn" onClick={() => onDelete()}>
            <Icon className="deleteIcon">delete</Icon>
          </IconButton>
        )}
        <CardActionArea>
          <div className="cardWrap" onClick={(e) => onNavigateHandler(e)}>
            <span className="circle" style={{ backgroundColor: `${cardData.cardColor}` }}></span>
            <span className="title">{cardData.categoryName}</span>
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
