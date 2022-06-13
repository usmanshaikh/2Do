import React, { useState } from "react";
import Icon from "@mui/material/Icon";
import CategoryCard from "../../components/Category/CategoryCard/CategoryCard";
import AddNewCategoryModal from "../../components/Modals/AddNewCategoryModal/AddNewCategoryModal";
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
  const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);

  const openAddNewCategoryHandler = () => {
    setOpenAddNewCategoryModal(true);
  };

  const closeAddNewCategoryModalHandler = () => {
    setOpenAddNewCategoryModal(false);
  };

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
          <div className="cardAction" onClick={openAddNewCategoryHandler}>
            <Icon className="menuIcon">add</Icon>
          </div>
        </div>
        <AddNewCategoryModal open={openAddNewCategoryModal} onClose={closeAddNewCategoryModalHandler} />
      </div>
    </>
  );
};

export default Category;
