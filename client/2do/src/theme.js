import RalewayMedium from "./assets/fonts/Raleway-Medium.woff2";
import RalewayMediumItalic from "./assets/fonts/Raleway-MediumItalic.woff2";
import RalewayRegular from "./assets/fonts/Raleway-Regular.woff2";
import RalewaySemiBold from "./assets/fonts/Raleway-SemiBold.woff2";
import RalewayBold from "./assets/fonts/Raleway-Bold.woff2";
import RalewayThinItalic from "./assets/fonts/Raleway-ThinItalic.woff2";
import RalewayThin from "./assets/fonts/Raleway-Thin.woff2";
import RalewayExtraBold from "./assets/fonts/Raleway-ExtraBold.woff2";
import { createTheme } from "@mui/material/styles";

const ralewayMedium = {
  fontFamily: "Raleway",
  src: `url(${RalewayMedium}) format('woff2')`,
  fontWeight: "500",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const ralewayMediumItalic = {
  fontFamily: "Raleway",
  src: `url(${RalewayMediumItalic}) format('woff2')`,
  fontWeight: "500",
  fontStyle: "italic",
  fontDisplay: "swap",
};

const ralewayRegular = {
  fontFamily: "Raleway",
  src: `url(${RalewayRegular}) format('woff2')`,
  fontWeight: "normal",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const ralewaySemiBold = {
  fontFamily: "Raleway",
  src: `url(${RalewaySemiBold}) format('woff2')`,
  fontWeight: "600",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const ralewayBold = {
  fontFamily: "Raleway",
  src: `url(${RalewayBold}) format('woff2')`,
  fontWeight: "bold",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const ralewayThinItalic = {
  fontFamily: "Raleway",
  src: `url(${RalewayThinItalic}) format('woff2')`,
  fontWeight: "100",
  fontStyle: "italic",
  fontDisplay: "swap",
};

const ralewayThin = {
  fontFamily: "Raleway",
  src: `url(${RalewayThin}) format('woff2')`,
  fontWeight: "100",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const ralewayExtraBold = {
  fontFamily: "Raleway",
  src: `url(${RalewayExtraBold}) format('woff2')`,
  fontWeight: "bold",
  fontStyle: "normal",
  fontDisplay: "swap",
};

const theme = createTheme({
  typography: {
    fontFamily: ["Raleway", "Roboto"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          ralewayMedium,
          ralewayMediumItalic,
          ralewayRegular,
          ralewaySemiBold,
          ralewayBold,
          ralewayThinItalic,
          ralewayThin,
          ralewayExtraBold,
        ],
      },
    },
  },
});

export default theme;
