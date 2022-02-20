import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useTranslation } from "react-i18next";
import { MyLink, ToggleLanguage } from "../helpers/i18n";
import { useResponsiveData } from "../helpers/responsive";
import { MENU } from "../menu";
import { Footer } from "./footer";
import { Helmet } from "./helmet";
import "./layout.scss";
import { CustomMDXProvider } from "./mdx";
import theme from "./theme";

const Layout: React.FC = ({ children }) => {
  const [isOpen, setDrawerOpen] = React.useState(false);
  const { isMobileOrTablet } = useResponsiveData();

  const layout = useStaticQuery(graphql`
    query {
      file(name: { eq: "devfest_color_text_white_white" }) {
        publicURL
      }
    }
  `);

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
    <>
      <Helmet />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar
          toggleDrawer={toggleDrawer}
          showMenu={!isMobileOrTablet}
          logo={layout.file.publicURL}
        />

        {isMobileOrTablet && (
          <BarMenu isOpen={isOpen} toggleDrawer={toggleDrawer} />
        )}
        <CustomMDXProvider>{children}</CustomMDXProvider>
        <Footer />
      </ThemeProvider>
    </>
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
  logo: string;
}> = ({ toggleDrawer, showMenu, logo }) => {
  const styleToolbar = showMenu
    ? { maxWidth: "1100px", width: "100%", margin: "auto" }
    : {};
  return (
    <AppBar position="sticky">
      <Toolbar style={styleToolbar}>
        <Box className="top-bar-left">
          <MyLink to="/">
            <img
              className="logo-top-bar"
              src={logo}
              alt="Logo Devfest 2021"
              height="50px"
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
          <ListItemText>
            <CloseRounded />
          </ListItemText>
        </ListItemButton>
        <Divider />
        <ListMenuButtons />
      </List>
    </Box>
  </Drawer>
);

const ListMenuButtons: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages" });
  return (
    <>
      {MENU.map((menuItem) => (
        <MyLink
          key={menuItem.label}
          to={menuItem.link}
          activeClassName="active-link"
          style={{ width: "100%" }}
        >
          <ListItemButton>
            <ListItemText disableTypography>
              {t(menuItem.label + ".name")}
            </ListItemText>
          </ListItemButton>
        </MyLink>
      ))}
      <ListItemButton>
        <ToggleLanguage />
      </ListItemButton>
    </>
  );
};

export default Layout;
