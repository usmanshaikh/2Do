import { createSlice } from "@reduxjs/toolkit";
import { setIsCompleted } from "../../utils/helpers";

interface InitialState {
  selectedCategory: {
    categoryName: string;
    cardColor: string;
    createdBy: string;
    deletable: boolean;
    _id: string;
  };
  selectedStatus: {
    label: string;
    isCompleted: boolean | null | undefined;
  };
  // dateRange: { start: Date | null; end: Date | null }; // Uncomment and adjust if needed
}

const initialState: InitialState = {
  selectedCategory: {
    categoryName: "",
    cardColor: "",
    createdBy: "",
    deletable: true,
    _id: "",
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
