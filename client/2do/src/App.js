import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalProvider from "mui-modal-provider";
import AppRoute from "./routes/AppRoute";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";
import { GlobalProvider } from "./utils/contexts/GlobalContext";
import "./App.scss";

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setIsShowMenu(true);
    } else {
      setIsShowMenu(false);
    }
  }, [location.pathname]);

  return (
    <>
      <GlobalProvider>
        <ModalProvider>
          <div className="App">
            {isShowMenu && <Header />}
            <main className="mainContentWrapper">
              <AppRoute />
            </main>
            {isShowMenu && <Menu />}
          </div>
        </ModalProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
