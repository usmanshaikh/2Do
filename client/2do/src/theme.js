import PoppinsMedium from "./assets/fonts/Poppins-Medium.woff2";
import PoppinsRegular from "./assets/fonts/Poppins-Regular.woff2";
import PoppinsSemiBold from "./assets/fonts/Poppins-SemiBold.woff2";
import PoppinsBold from "./assets/fonts/Poppins-Bold.woff2";
import PoppinsLight from "./assets/fonts/Poppins-Light.woff2";
import { createTheme } from "@mui/material/styles";

const poppinsMedium = {
  fontFamily: "Poppins",
  src: `url(${PoppinsMedium}) format('woff2')`,
  fontWeight: "500",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const poppinsRegular = {
  fontFamily: "Poppins",
  src: `url(${PoppinsRegular}) format('woff2')`,
  fontWeight: "normal",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const poppinsSemiBold = {
  fontFamily: "Poppins",
  src: `url(${PoppinsSemiBold}) format('woff2')`,
  fontWeight: "600",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const poppinsBold = {
  fontFamily: "Poppins",
  src: `url(${PoppinsBold}) format('woff2')`,
  fontWeight: "bold",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const poppinsLight = {
  fontFamily: "Poppins",
  src: `url(${PoppinsLight}) format('woff2')`,
  fontWeight: "300",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [poppinsMedium, poppinsRegular, poppinsSemiBold, poppinsBold, poppinsLight],
      },
    },
  },
});

export default theme;
