import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  isVisible: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const initialState: SnackbarState = {
  isVisible: false,
  message: "",
  type: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<{ message: string; type?: SnackbarState["type"] }>) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "error";
    },
    hideSnackbar: (state) => {
      state.isVisible = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
