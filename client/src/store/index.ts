import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import loaderReducer from "./slices/loaderSlice";
import snackbarReducer from "./slices/snackbarSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    loader: loaderReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
