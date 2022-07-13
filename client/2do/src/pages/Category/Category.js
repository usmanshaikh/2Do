import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import Icon from "@mui/material/Icon";
import CategoryCard from "../../components/Cards/CategoryCard/CategoryCard";
import AddNewCategoryModal from "../../components/Modals/AddNewCategoryModal/AddNewCategoryModal";
import useGlobalContext from "../../utils/hooks/useGlobalContext";
import * as Path from "../../utils/constants/routePath.constants";
import "./Category.scss";

const CATEGORY_ITEM = [
  {
    color: "#728cfb",
    title: "Personal",
    taskCount: 10,
    checkListCount: 20,
    id: 1,
  },
  {
    color: "#ed467e",
    title: "Home",
    taskCount: 7,
    checkListCount: 3,
    id: 2,
  },
  {
    color: "#ff6900",
    title: "Office",
    taskCount: 19,
    checkListCount: 8,
    id: 3,
  },
];

const Category = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { CFBY_state } = useGlobalContext();

  const openAddNewCategoryHandler = () => {
    const initialState = {
      onSubmitForm: (data) => saveFormHandler(data),
    };
    showModal(AddNewCategoryModal, initialState, { destroyOnClose: true });
  };

  const saveFormHandler = (data) => {
    console.log({ data });
  };

  const onMyTaskPageHandler = (category) => {
    navigate({
      pathname: `/${Path.TASK}`,
      search: createSearchParams({
        categoryBy: category.toLowerCase(),
        filterBy: CFBY_state.filterBy.toLowerCase(),
      }).toString(),
    });
  };

  return (
    <>
      <div className="categoryPageWrapper">
        <div className="flexContainer">
          {CATEGORY_ITEM.map((item) => (
            <div className="flexItem" key={item.id}>
              <CategoryCard
                title={item.title}
                taskCount={item.taskCount}
                checkListCount={item.checkListCount}
                color={item.color}
                onCategory={(data) => onMyTaskPageHandler(data)}
              />
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
