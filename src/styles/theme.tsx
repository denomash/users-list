import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";

/**
 * @description theme is an object that contains the theme styles
 */
const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#D84465",
      dark: "#D84465",
      light: "#FDF5F7",
    },
    secondary: {
      main: "#0F103A",
      dark: "#0F103A",
      light: "#EDEDF0",
    },
    error: {
      main: "#F1A40F",
      light: "#f1a40f21",
    },
  },
});

export default theme;
