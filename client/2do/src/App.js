import React from "react";
import ModalProvider from "mui-modal-provider";
import AppRoute from "./routes/AppRoute";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";
import { GlobalProvider } from "./utils/contexts/GlobalContext";
import "./App.scss";

function App() {
  return (
    <>
      <ModalProvider>
        <GlobalProvider>
          <div className="App">
            <Header />
            <main className="mainContentWrapper">
              <AppRoute />
            </main>
            <Menu />
          </div>
        </GlobalProvider>
      </ModalProvider>
    </>
  );
}

export default App;
