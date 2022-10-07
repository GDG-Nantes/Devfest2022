import { createTheme } from "@mui/material";
import "./theme.scss";

const primary = "#c14d32";
const secondary = "#36666a";
// const primary = "#c14d32";
// const secondary = "#36666a";
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
      xs: 320,
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
          fontSize: "2rem",
          lineHeight: "1.2",
          margin: "3rem 0",
          fontFamily: "RumbleBrave",
          fontWeight: "normal",
        },
        h2: {
          fontSize: "1.7rem",
          lineHeight: "1.2",
          margin: "3rem 0",
          fontFamily: "RumbleBrave",
          fontWeight: "normal",
        },
        h3: {
          fontSize: "1.17rem",
          lineHeight: "1.2",
          fontFamily: "Acme, sans-serif",
          fontWeight: "normal",
        },
        h4: {
          fontSize: "1rem",
          lineHeight: "1.3",
          fontFamily: "Acme, sans-serif",
          fontWeight: "normal",
        },
      },
    },
  },
});

theme.typography.h1 = {
  [theme.breakpoints.up("md")]: {
    fontSize: "3.5rem",
  },
};
theme.typography.h2 = {
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

export default theme;
