import React from "react";
import { Box } from "@mui/material";
import AppRoute from "./routes/AppRoute";
import Layout from "./components/Layout/Layout";
import "./App.scss";

const App = () => {
  return (
    <Box className="App">
      <Layout>
        <AppRoute />
      </Layout>
    </Box>
  );
};

export default App;
