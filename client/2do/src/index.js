import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ModalProvider from "mui-modal-provider";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { GlobalProvider, GlobalSnackbarAlertProvider } from "./utils/contexts";
import App from "./App";
import theme from "./theme";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalProvider>
      <GlobalSnackbarAlertProvider>
        <ModalProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ScrollToTop />
            <App />
          </ThemeProvider>
        </ModalProvider>
      </GlobalSnackbarAlertProvider>
    </GlobalProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
