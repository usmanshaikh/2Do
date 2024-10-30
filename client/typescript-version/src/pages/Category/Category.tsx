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
      onSubmitForm: (item: CategoryCount) => handleCreateCategory(item),
    };
    showModal(AddNewCategoryModal, initialState, { destroyOnClose: true });
  };

  const handleCreateCategory = async (item: CategoryCount) => {
    try {
      await categoryApi.createCategory(item);
      fetchCategoryWithCount();
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleTaskNavigation = (item: CategoryCount) => {
    dispatch(setFilter({ category: item, status: MSG.STATUSES.ALL }));
    if (item.taskCount) {
      navigate(`/${ROUTES.TASK}`);
    } else if (item.checklistCount) {
      navigate(`/${ROUTES.CHECKLIST}`);
    } else {
      navigate(`/${ROUTES.TASK}`);
    }
  };

  const handleDeleteCategory = (item: CategoryCount) => {
    const initialState = {
      message: MSG.USER_FEEDBACK.CONFIRMATION_DELETE,
      onConfirm: () => handleConfirmDeleteCategory(item),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const handleConfirmDeleteCategory = async (item: CategoryCount) => {
    try {
      const categoryId = item.id;
      await categoryApi.deleteCategory(categoryId);
      setCategories(categories.filter((category) => category.id !== item.id));
      dispatch(showSnackbar({ message: MSG.USER_FEEDBACK.CATEGORY.DELETED, type: "info" }));
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  return (
    <Box className="categoryPageWrapper">
      <Box className="flexContainer">
        {categories &&
          categories.map((item) => (
            <Box className="flexItem" key={item.id}>
              <CategoryCard
                cardData={item}
                onNavigate={() => handleTaskNavigation(item)}
                onDelete={() => handleDeleteCategory(item)}
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
