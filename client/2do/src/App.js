import React, { useState } from "react";
import AppRoute from "./routes/AppRoute";
import Menu from "./components/Menu/Menu";
import Header from "./components/Header/Header";
import AddTaskModal from "./components/Modals/AddTaskModal/AddTaskModal";
import { AddTaskModalContext } from "./utils/contexts/AddTaskModalContext";
import "./App.scss";

function App() {
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

  const openAddTaskModalHandler = () => {
    setOpenAddTaskModal(true);
  };

  const closeAddTaskModalHandler = (value) => {
    setOpenAddTaskModal(false);
  };

  return (
    <>
      <AddTaskModalContext.Provider
        value={{
          openAddTaskModal: openAddTaskModalHandler,
        }}>
        <div className="App">
          <Header />
          <main className="mainContentWrapper">
            <AppRoute />
            <AddTaskModal open={openAddTaskModal} onClose={closeAddTaskModalHandler} />
          </main>
          <Menu />
        </div>
      </AddTaskModalContext.Provider>
    </>
  );
}

export default App;
