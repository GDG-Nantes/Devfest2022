import { createTheme } from "@mui/material";
import "./theme.scss";

const primary = "#C14D32";
const secondary = "#757341";
// const secondary = "#C14D32";
// const primary = "#757341";
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
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          color: "white",
        },
      },
    },
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
        h1: {
          fontSize: "4rem",
          lineHeight: "4rem",
          margin: "4rem 0",
          fontFamily: "RumbleBrave",
        },
        h2: {
          fontSize: "2rem",
          lineHeight: "2rem",
          margin: "3rem 0",
          fontFamily: "RumbleBrave",
        },
        h3: {
          fontSize: "1.17rem",
          lineHeight: "1.5rem",
          fontFamily: "RumbleBrave",
        },
        h4: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: "RumbleBrave",
        },
      },
    },
  },
});

export default theme;
