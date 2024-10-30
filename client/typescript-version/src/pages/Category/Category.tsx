import { useEffect, useState } from "react";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { CategoryCard, AddNewCategoryModal, ConfirmationModal } from "../../components";
import { categoryApi } from "../../api";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/slices/filterSlice";
import { MSG, ROUTES } from "../../utils/constants";
import { showSnackbar } from "../../store/slices";
import { CategoriesWithTaskAndChecklistCount } from "../../api/types";
import "./Category.scss";

type CategoryCount = CategoriesWithTaskAndChecklistCount;

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [categories, setCategories] = useState<CategoryCount[]>([]);

  useEffect(() => {
    fetchCategoryWithCount();
  }, []);

  const fetchCategoryWithCount = async () => {
    try {
      const { data } = await categoryApi.categoryWithCount();
      const sortedCategories = data.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
      setCategories(sortedCategories);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleOpenAddNewCategory = () => {
    const initialState = {
      onSubmitForm: (newCategory: CategoryCount) => handleCreateCategory(newCategory),
    };
    showModal(AddNewCategoryModal, initialState, { destroyOnClose: true });
  };

  const handleCreateCategory = async (newCategory: CategoryCount) => {
    try {
      await categoryApi.createCategory(newCategory);
      fetchCategoryWithCount();
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const navigateToCategoryTasks = (category: CategoryCount) => {
    dispatch(setFilter({ category, status: MSG.STATUSES.ALL }));
    if (category.taskCount) {
      navigate(`/${ROUTES.TASK}`);
    } else if (category.checklistCount) {
      navigate(`/${ROUTES.CHECKLIST}`);
    } else {
      navigate(`/${ROUTES.TASK}`);
    }
  };

  const openDeleteCategoryConfirmation = (category: CategoryCount) => {
    const initialState = {
      message: MSG.USER_FEEDBACK.CONFIRMATION_DELETE,
      onConfirm: () => handleConfirmDeleteCategory(category),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const handleConfirmDeleteCategory = async (category: CategoryCount) => {
    try {
      await categoryApi.deleteCategory(category.id);
      setCategories(categories.filter((item) => item.id !== category.id));
      dispatch(showSnackbar({ message: MSG.USER_FEEDBACK.CATEGORY.DELETED, type: "info" }));
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  return (
    <Box className="categoryPageWrapper">
      <Box className="flexContainer">
        {categories.map((category) => (
          <Box className="flexItem" key={category.id}>
            <CategoryCard
              cardData={category}
              onNavigate={() => navigateToCategoryTasks(category)}
              onDelete={() => openDeleteCategoryConfirmation(category)}
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
  );
};

export default Category;
