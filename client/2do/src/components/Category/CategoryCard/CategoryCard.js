import React from "react";
import "./CategoryCard.scss";

const CategoryCard = (props) => {
  return (
    <>
      <div className="categoryCard">
        <span className="circle" style={{ backgroundColor: `${props.color}` }}></span>
        <span className="title">{props.title}</span>
        <span className="count-info">
          <span className="count">{props.count}</span> Tasks
        </span>
      </div>
    </>
  );
};

export default CategoryCard;
