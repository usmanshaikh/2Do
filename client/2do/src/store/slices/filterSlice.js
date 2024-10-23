import { createSlice } from "@reduxjs/toolkit";
import { setIsCompleted } from "../../utils/Helpers";

const initialState = {
  selectedCategory: {
    categoryName: "",
    cardColor: "",
    createdBy: "",
    deletable: true,
    id: "",
  },
  selectedStatus: {
    label: "",
    isCompleted: null,
  },
  // dateRange: { start: null, end: null },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { category, status } = action.payload;
      if (category !== undefined) {
        state.selectedCategory = category;
      }
      if (status !== undefined) {
        state.selectedStatus = {
          label: status,
          isCompleted: setIsCompleted(status),
        };
      }
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
