import { useEffect, useState } from "react";
import { Container, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { categoryApi } from "../../api";
import { MSG } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { showSnackbar, setFilter } from "../../store/slices";
import { RootState } from "../../store";
import "./Filters.scss";

const STATUS_ARRAY = [MSG.STATUSES.ALL, MSG.STATUSES.PENDING, MSG.STATUSES.COMPLETED];
const Filters = () => {
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const filter = useAppSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();

  const fetchCategories = () => {
    categoryApi.allCategoriesForModal().then((res) => {
      setCategories(res.data);
      const { selectedCategory, selectedStatus } = filter;

      if (selectedCategory?.id) setSelectedCategory(selectedCategory.id);

      if (selectedStatus?.label) setSelectedStatus(selectedStatus.label);

      if (!selectedCategory?.id || !selectedStatus?.label) {
        const defaultCategory = res.data[0];
        const defaultStatus = STATUS_ARRAY[0];
        setSelectedCategory(defaultCategory.id);
        setSelectedStatus(defaultStatus);
        dispatch(setFilter({ category: defaultCategory, status: defaultStatus }));
      }
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
                {STATUS_ARRAY.map((item) => (
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
