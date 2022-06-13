import React from "react";
import Icon from "@mui/material/Icon";
import CategoryCard from "../../components/Category/CategoryCard/CategoryCard";
import "./Category.scss";

const CATEGORY_ITEM = [
  {
    color: "#718cfb",
    title: "Personal",
    count: 10,
    id: 1,
  },
  {
    color: "#ec4379",
    title: "Home",
    count: 7,
    id: 2,
  },
  {
    color: "#69c369",
    title: "Office",
    count: 19,
    id: 3,
  },
];

const Category = () => {
  return (
    <>
      <div className="categoryPageWrapper">
        <div className="flexContainer">
          {CATEGORY_ITEM.map((item) => (
            <div className="flexItem" key={item.id}>
              <CategoryCard title={item.title} count={item.count} color={item.color} />
            </div>
          ))}
        </div>
        <div className="addCardWrapper">
          <div className="cardAction">
            <Icon className="menuIcon">add</Icon>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
