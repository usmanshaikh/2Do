import React from "react";
import { CardActionArea, Card } from "@mui/material";
import "./CategoryCard.scss";

const CategoryCard = (props) => {
  return (
    <>
      <Card className="categoryCardComponentWrapper">
        <CardActionArea>
          <div className="cardWrap">
            <span className="circle" style={{ backgroundColor: `${props.color}` }}></span>
            <span className="title">{props.title}</span>
            <span className="count-info">
              <span className="count">{props.count}</span> Tasks
            </span>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CategoryCard;
