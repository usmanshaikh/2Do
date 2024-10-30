import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ModalProvider from "mui-modal-provider";
import reportWebVitals from "./reportWebVitals";
import { Loader } from "./components";
import App from "./App";
import theme from "./theme";
import "./index.scss";

import store from "./store/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loader />
          <App />
        </ThemeProvider>
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
