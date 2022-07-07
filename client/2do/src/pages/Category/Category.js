import React, { useState } from "react";
import Icon from "@mui/material/Icon";
import { Button } from "@mui/material";
import CategoryCard from "../../components/Cards/CategoryCard/CategoryCard";
import AddNewCategoryModal from "../../components/Modals/AddNewCategoryModal/AddNewCategoryModal";
import { useModal } from "mui-modal-provider";
import "./Category.scss";

const CATEGORY_ITEM = [
  {
    color: "#728cfb",
    title: "Personal",
    count: 10,
    id: 1,
  },
  {
    color: "#ed467e",
    title: "Home",
    count: 7,
    id: 2,
  },
  {
    color: "#ff6900",
    title: "Office",
    count: 19,
    id: 3,
  },
];

const Category = () => {
  const { showModal } = useModal();

  const openAddNewCategoryHandler = () => {
    const initialState = {
      onSubmitForm: (data) => saveFormHandler(data),
    };
    showModal(AddNewCategoryModal, initialState, { destroyOnClose: true });
  };

  const saveFormHandler = (data) => {
    console.log({ data });
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
          <Button variant="contained" className="cardAction" onClick={openAddNewCategoryHandler}>
            <Icon className="addIcon">add</Icon>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Category;
