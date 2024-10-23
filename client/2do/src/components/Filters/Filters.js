import React, { useContext, useEffect, useState } from "react";
import { Container, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CategoryAPI } from "../../api";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { setFilter } from "../../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../utils/constants/message.constants";
import constants from "../../utils/constants";
import "./Filters.scss";

const MSG = constants.message;

const Filters = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const fetchCategories = () => {
    CategoryAPI.allCategoriesForModal()
      .then((res) => {
        setCategories(res);
        const { selectedCategory, selectedStatus } = filter;

        if (selectedCategory?.id) setSelectedCategory(selectedCategory.id);

        if (selectedStatus?.label) setSelectedStatus(selectedStatus.label);

        if (!selectedCategory?.id || !selectedStatus?.label) {
          const defaultCategory = res[0];
          const defaultStatus = STATUS[0];
          setSelectedCategory(defaultCategory.id);
          setSelectedStatus(defaultStatus);
          dispatch(setFilter({ category: defaultCategory, status: defaultStatus }));
        }
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilterChange = (value, type) => {
    if (type === "category") {
      const selectedCategory = categories.find((category) => category.id === value);
      setSelectedCategory(value);
      dispatch(setFilter({ category: selectedCategory }));
    } else if (type === "status") {
      setSelectedStatus(value);
      dispatch(setFilter({ status: value }));
    }
  };

  return (
    <Box className="filtersComponentWrapper">
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ md: 12, lg: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Select Category"
                onChange={(e) => handleFilterChange(e.target.value, "category")}>
                {categories &&
                  categories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ md: 12, lg: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Select Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Select Status"
                onChange={(e) => handleFilterChange(e.target.value, "status")}>
                {STATUS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Filters;
