import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./ChooseCategory.scss";

const ChooseCategory = () => {
  const category = [{ label: "Personal" }, { label: "Home" }, { label: "Office" }];
  return (
    <>
      <div className="chooseCategoryComponentWrapper">
        <span className="commonLabel">Choose Category</span>
        <div className="autocompleteWrap">
          <Autocomplete
            disablePortal
            options={category}
            defaultValue={category[0]}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </>
  );
};

export default ChooseCategory;
