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
import "./Category.scss";

const Category = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [categories, setCategories] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    categoryWithCount();
  }, []);

  const categoryWithCount = () => {
    categoryApi.categoryWithCount().then((res: any) => {
      const first = "personal";
      const data = res.data.sort((x, y) =>
        x.categoryName.toLowerCase() == first ? -1 : y.categoryName.toLowerCase() == first ? 1 : 0
      );
      console.log({ data });

      setCategories(data);
    });
  };

  const handleOpenAddNewCategory = () => {
    const initialState = {
      onSubmitForm: (data) => createCategory(data),
    };
    showModal(AddNewCategoryModal, initialState, { destroyOnClose: true });
  };

  const createCategory = (data) => {
    categoryApi.createCategory(data).then((res) => categoryWithCount());
  };

  const handleTaskNavigation = (data) => {
    dispatch(setFilter({ category: data, status: MSG.STATUSES.ALL }));
    if (data.taskCount) {
      navigate(`/${ROUTES.TASK}`);
    } else if (data.checklistCount) {
      navigate(`/${ROUTES.CHECKLIST}`);
    } else {
      navigate(`/${ROUTES.TASK}`);
    }
  };

  const handleDeleteTask = (data) => {
    const initialState = {
      message: MSG.USER_FEEDBACK.CONFIRMATION_DELETE,
      onConfirm: () => deleteCategory(data),
      type: "danger",
    };
    showModal(ConfirmationModal, initialState, { destroyOnClose: true });
  };

  const deleteCategory = (data) => {
    const categoryId = data.id;
    categoryApi
      .deleteCategory(categoryId)
      .then((res) => {
        setCategories(categories.filter((item) => item.id !== data.id));
        dispatch(showSnackbar({ message: MSG.USER_FEEDBACK.CATEGORY.DELETED, type: "info" }));
      })
      .catch((err) => dispatch(showSnackbar({ message: err.message, type: "error" })));
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
