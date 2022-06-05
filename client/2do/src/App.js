import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Walkthrough from "./pages/Walkthrough/Walkthrough";
import Login from "./pages/Auth/Login/Login";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/walkthrough" element={<Walkthrough />} />
      </Routes>
    </div>
  );
}

export default App;
