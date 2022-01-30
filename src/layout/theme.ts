import { createTheme } from "@mui/material";
import "./theme.scss";

const secondary = "#ED7954";
const primary = "#4483A2";
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
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
    MuiIconButton: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiLink: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          margin: "1rem 0 4rem",
        },
        h3: {
          fontSize: "1.17rem",
          lineHeight: "1.5rem",
          fontWeight: "bold",
        },
        h4: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
  },
});

export default theme;
