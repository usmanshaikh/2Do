import React, { useEffect } from "react";
import Icon from "@mui/material/Icon";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { CategoryCard } from "../../components/Cards";
import { AddNewCategoryModal } from "../../components/Modals";
import { useGlobalContext, useNavigateWithParams } from "../../utils/hooks";
import constants from "../../utils/constants";
import "./Category.scss";

const ROUTE = constants.routePath;

const CATEGORY_ITEM = [
  {
    color: "#728cfb",
    title: "Personal",
    taskCount: 10,
    checklistCount: 20,
    id: 1,
  },
  {
    color: "#ed467e",
    title: "Home",
    taskCount: 7,
    checklistCount: 3,
    id: 2,
  },
  {
    color: "#ff6900",
    title: "Office",
    taskCount: 19,
    checklistCount: 8,
    id: 3,
  },
];

const Category = () => {
  const { showModal } = useModal();
  const { setHeaderTitleHandler, filterOptions } = useGlobalContext();
  const { navigateWithParams } = useNavigateWithParams();

  useEffect(() => {
    setHeaderTitleHandler("Category");
  }, []);

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
    navigateWithParams(`/${ROUTE.TASK}`, category, filterOptions.filterBy);
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
                checklistCount={item.checklistCount}
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
