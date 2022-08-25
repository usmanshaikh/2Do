import React, { useContext, useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { CategoryCard } from "../../components/Cards";
import { AddNewCategoryModal } from "../../components/Modals";
import { useGlobalContext } from "../../utils/hooks";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import constants from "../../utils/constants";
import CategoryAPI from "../../api/CategoryAPI";
import "./Category.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const Category = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { setHeaderTitleHandler, filterOptions, filterOptionsDispatchHandler } = useGlobalContext();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const [categories, setCategories] = useState();

  useEffect(() => {
    setHeaderTitleHandler("Category");
    categoryWithCount();
  }, []);

  const categoryWithCount = () => {
    CategoryAPI.categoryWithCount()
      .then((res) => setCategories(res))
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const openAddNewCategoryHandler = () => {
    const initialState = {
      onSubmitForm: (data) => createCategory(data),
    };
    showModal(AddNewCategoryModal, initialState, { destroyOnClose: true });
  };

  const createCategory = (data) => {
    CategoryAPI.createCategory(data)
      .then((res) => categoryWithCount())
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const onNavigateToParticularTaskHandler = (data) => {
    const categoryName = data.categoryName;
    const category = data._id;
    const isCompleted = MSG.FITER_BY_ALL;
    const dispatchPayload = { type: "setState", categoryName, category, isCompleted };
    filterOptionsDispatchHandler(dispatchPayload);
    navigate(`/${ROUTE.TASK}`);
  };

  return (
    <>
      <div className="categoryPageWrapper">
        <div className="flexContainer">
          {categories &&
            categories.map((item) => (
              <div className="flexItem" key={item._id}>
                <CategoryCard
                  title={item.categoryName}
                  taskCount={item.taskCount}
                  checklistCount={item.checklistCount}
                  color={item.cardColor}
                  onCategory={() => onNavigateToParticularTaskHandler(item)}
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
