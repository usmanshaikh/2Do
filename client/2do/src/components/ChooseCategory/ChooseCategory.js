import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { hideFooter, showFooter } from "../../utils/Helpers";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import CategoryAPI from "../../api/CategoryAPI";
import "./ChooseCategory.scss";

const ChooseCategory = (props) => {
  const { isEdit, category, onChooseCategory } = props;
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    if (isEdit && category) setSelectedCategory(category);
    else getAllCategories();
  }, [category]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    CategoryAPI.allCategories(true)
      .then((res) => {
        setCategories(res);
        if (!isEdit) {
          setSelectedCategory(res[0]);
          defaultCompValueIfNotEdit(res[0]);
        }
      })
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const handleChange = (item) => {
    const obj = { category: item.id };
    onChooseCategory(obj);
    setSelectedCategory(item);
  };

  const defaultCompValueIfNotEdit = (data) => {
    const obj = { category: data.id };
    onChooseCategory(obj);
  };

  return (
    <>
      {categories && (
        <div className="chooseCategoryComponentWrapper">
          <span className="commonLabel">Choose Category</span>
          <div className="autocompleteWrap">
            <Autocomplete
              disablePortal
              onChange={(event, value) => handleChange(value)}
              options={categories}
              value={selectedCategory ? selectedCategory : " "}
              defaultValue={selectedCategory}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option.categoryName ? option.categoryName : "")}
              onFocus={hideFooter}
              onBlur={showFooter}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseCategory;
