import { Box } from "@mui/material";
import { Layout } from "./components";
import { useAxiosInterceptor } from "./hooks";
import AppRoutes from "./routes";
import "./App.scss";

const App = () => {
  const isLoaded = useAxiosInterceptor();

  if (!isLoaded) return <Box style={{ visibility: "hidden" }}>Loading...</Box>;

  return (
    <Box className="App">
      <Layout>
        <AppRoutes />
      </Layout>
    </Box>
  );
};

export default App;
