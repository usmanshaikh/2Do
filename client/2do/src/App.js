import React from "react";
import AppRoute from "./routes/AppRoute";
import "./App.scss";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <AppRoute />
      {/* <Menu /> */}
    </div>
  );
}

export default App;
