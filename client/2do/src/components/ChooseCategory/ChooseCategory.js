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
    CategoryAPI.allCategories()
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

// import React, { useEffect, useState } from "react";
// import { Autocomplete, TextField } from "@mui/material";
// import { hideFooter, showFooter } from "../../utils/Helpers";
// import "./ChooseCategory.scss";

// const CATEGORY = [
//   { label: "Personal", id: 1 },
//   { label: "Home", id: 2 },
//   { label: "Office", id: 3 },
// ];

// const ChooseCategory = (props) => {
//   const [category, setCategory] = useState(CATEGORY[0]);

//   const handleChange = (value) => {
//     setCategory(value);
//   };

//   useEffect(() => {
//     props.onChooseCategory(category);
//   }, [category]);

//   return (
//     <>
//       <div className="chooseCategoryComponentWrapper">
//         <span className="commonLabel">Choose Category</span>
//         <div className="autocompleteWrap">
//           <Autocomplete
//             disablePortal
//             onChange={(event, value) => handleChange(value)}
//             isOptionEqualToValue={(option, value) => option.id === value.id}
//             options={CATEGORY}
//             defaultValue={CATEGORY[0]}
//             onFocus={hideFooter}
//             onBlur={showFooter}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChooseCategory;
