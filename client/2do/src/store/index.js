import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});

export default store;
