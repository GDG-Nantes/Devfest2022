import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { graphql, useStaticQuery } from "gatsby";
// import { LocalizedLink as Link } from "gatsby-theme-i18n";
import React from "react";
import { MyLink } from "../helpers/i18n";
import { useResponsiveData } from "../helpers/responsive";
import { MENU } from "../menu";
import "./layout.scss";
import { CustomMDXProvider } from "./mdx";
import theme from "./theme";

const Layout: React.FC = ({ children }) => {
  const [isOpen, setDrawerOpen] = React.useState(false);
  const { isMobileOrTablet } = useResponsiveData();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar toggleDrawer={toggleDrawer} showMenu={!isMobileOrTablet} />

      {isMobileOrTablet && (
        <BarMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
      )}
      <CustomMDXProvider>{children}</CustomMDXProvider>
    </ThemeProvider>
  );
};

const TopMenu = () => (
  <List className="menu-desktop">
    <ListMenuButtons />
  </List>
);

const Topbar: React.FC<{
  toggleDrawer: (open) => (event) => void;
  showMenu: boolean;
}> = ({ toggleDrawer, showMenu }) => {
  const logo = useStaticQuery(graphql`
    query {
      file(name: { eq: "devfest_color_text_white_white" }) {
        publicURL
      }
    }
  `);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box className="top-bar-left">
          <MyLink to="/">
            <img
              className="logo-top-bar"
              src={logo.file.publicURL}
              alt="Logo Devfest 2021"
            />
          </MyLink>
        </Box>

        <Box className="top-bar-right">
          {showMenu ? (
            <TopMenu />
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuRounded />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const BarMenu: React.FC<{
  toggleDrawer: (open) => (event) => void;
  isOpen: boolean;
}> = ({ isOpen, toggleDrawer }) => (
  <Drawer
    className="drawer"
    anchor="top"
    variant="temporary"
    open={isOpen}
    onClose={toggleDrawer(false)}
  >
    <Box
      className="menu-mobile"
      role="presentation"
      onKeyDown={toggleDrawer(true)}
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton style={{ height: "75px", justifyContent: "end" }}>
          <ListItemIcon>
            <CloseRounded />
          </ListItemIcon>
        </ListItemButton>
        <Divider />
        <ListMenuButtons />
      </List>
    </Box>
  </Drawer>
);

const ListMenuButtons: React.FC = () => (
  <>
    {MENU.map((menuItem) => (
      <ListItemButton key={menuItem.label}>
        <MyLink
          to={menuItem.link}
          activeClassName="active-link"
          style={{ width: "100%" }}
        >
          <ListItemText disableTypography>{menuItem.label}</ListItemText>
        </MyLink>
      </ListItemButton>
    ))}
  </>
);

export default Layout;
