import { Box } from "@mui/material";
import AppRoute from "./routes/AppRoute";
import { Layout } from "./components";
import { useAxiosInterceptor } from "./hooks";
import "./App.scss";

const App = () => {
  const isLoaded = useAxiosInterceptor();

  if (!isLoaded) return <Box style={{ visibility: "hidden" }}>Loading...</Box>;

  return (
    <Box className="App">
      <Layout>
        <AppRoute />
      </Layout>
    </Box>
  );
};

export default App;
