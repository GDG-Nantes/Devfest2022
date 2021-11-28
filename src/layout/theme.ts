import { createTheme } from "@mui/material";
import "./theme.scss";

// A custom theme for this app
const theme = createTheme({
  typography: {
    allVariants: {
      color: "white",
    },
  },
  palette: {
    primary: {
      main: "#4483A2",
    },
    secondary: {
      main: "#ED7954",
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 300,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    // MuiIconButton: {
    //   defaultProps: {
    //     color: "secondary", // TODO
    //   },
    // },
  },
});

export default theme;
