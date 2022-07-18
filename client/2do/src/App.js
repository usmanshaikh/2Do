import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";
import useGlobalContext from "./utils/hooks/useGlobalContext";
import "./App.scss";

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const location = useLocation();
  const { setAuthenticateHandler } = useGlobalContext();

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      setIsShowMenu(true);
      setAuthenticateHandler(true);
    } else {
      setIsShowMenu(false);
      setAuthenticateHandler(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="App">
        {isShowMenu && <Header />}
        <main className="mainContentWrapper">
          <AppRoute />
        </main>
        {isShowMenu && <Menu />}
      </div>
    </>
  );
}

export default App;
