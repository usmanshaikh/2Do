import { useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { getAxiosErrorMessage, hideFooter, showFooter } from "../../utils/helpers";
import { categoryApi } from "../../api";
import { showSnackbar } from "../../store/slices/snackbarSlice";
import { useAppDispatch } from "../../hooks";
import { CategoryResponse } from "../../api/types";
import { MSG } from "../../utils/constants";
import "./ChooseCategory.scss";

interface Props {
  isEdit: boolean;
  category?: any;
  onSelectCategory: (categoryId: string) => void;
}

const ChooseCategory = ({ isEdit, category, onSelectCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<CategoryResponse[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categoryOptions.length) {
      if (isEdit && category) {
        setSelectedCategory(category);
      } else {
        onSelectCategory(categoryOptions[0].id);
        setSelectedCategory(categoryOptions[0]);
      }
    }
  }, [categoryOptions, isEdit, category]);

  const loadCategories = async () => {
    try {
      const { data } = await categoryApi.allCategories(true);
      setCategoryOptions(data);
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const handleCategoryChange = (selected: CategoryResponse) => {
    onSelectCategory(selected.id);
    setSelectedCategory(selected);
  };

  return (
    <>
      {selectedCategory && (
        <Box className="chooseCategoryComponentWrapper">
          <span className="commonLabel">Choose Category</span>
          <Box className="autocompleteWrap">
            <Autocomplete
              disablePortal
              onChange={(e, value: CategoryResponse) => handleCategoryChange(value)}
              options={categoryOptions}
              value={selectedCategory}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.categoryName}
              onFocus={hideFooter}
              onBlur={showFooter}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box key={option.id} component="li" {...optionProps}>
                    {option.categoryName}
                  </Box>
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            {/* <Autocomplete
              disablePortal
              onChange={(event, value) => handleCategoryChange(value)}
              options={categoryOptions}
              value={selectedCategory ? selectedCategory : " "}
              defaultValue={selectedCategory}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option: any) => {
                const match = categoryOptions.find((value) => value.id === option);
                return match ? match.categoryName : option.categoryName;
              }}
              onFocus={hideFooter}
              onBlur={showFooter}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box key={option.id} component="li" {...optionProps}>
                    {option.categoryName}
                  </Box>
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            /> */}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChooseCategory;
