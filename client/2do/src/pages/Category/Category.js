import React, { useContext, useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { CategoryCard } from "../../components/Cards";
import { AddNewCategoryModal, ConfirmationModal } from "../../components/Modals";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { CategoryAPI } from "../../api";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/slices/filterSlice";
import constants from "../../utils/constants";
import "./Category.scss";

const ROUTE = constants.routePath;
const MSG = constants.message;

const Category = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const [categories, setCategories] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    categoryWithCount();
  }, []);

  const categoryWithCount = () => {
    CategoryAPI.categoryWithCount()
      .then((res) => {
        const first = "personal";
        const data = res.sort((x, y) =>
          x.categoryName.toLowerCase() == first ? -1 : y.categoryName.toLowerCase() == first ? 1 : 0
        );
        setCategories(data);
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const handleOpenAddNewCategory = () => {
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

  const handleTaskNavigation = (data) => {
    dispatch(setFilter({ category: data, status: MSG.STATUS_ALL }));
    if (data.taskCount) {
      navigate(`/${ROUTE.TASK}`);
    } else if (data.checklistCount) {
      navigate(`/${ROUTE.CHECKLIST}`);
    } else {
      navigate(`/${ROUTE.TASK}`);
    }
  };

  const handleDeleteTask = (data) => {
    const initialState = {
      message: MSG.CONFIRMATION_DELETE,
      onConfirm: () => deleteCategory(data),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const deleteCategory = (data) => {
    const categoryId = data.id;
    CategoryAPI.deleteCategory(categoryId)
      .then((res) => {
        setCategories(categories.filter((item) => item.id !== data.id));
        snackbarAlert.showSnackbarAlert({ msg: MSG.CATEGORY_DELETED, duration: 2000 });
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error", duration: 6000 }));
  };
  return (
    <>
      <Box className="categoryPageWrapper">
        <Box className="flexContainer">
          {categories &&
            categories.map((item) => (
              <Box className="flexItem" key={item.id}>
                <CategoryCard
                  cardData={item}
                  onNavigate={() => handleTaskNavigation(item)}
                  onDelete={() => handleDeleteTask(item)}
                />
              </Box>
            ))}
        </Box>
        <Box className="addCardWrapper">
          <Button variant="contained" className="cardAction" onClick={handleOpenAddNewCategory}>
            <Icon className="addIcon">add</Icon>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Category;
