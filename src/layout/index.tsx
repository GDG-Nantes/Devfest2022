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
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { useResponsiveData } from "../helpers/responsive";
import "./layout.scss";
import theme from "./theme";

const MENU: Array<{ label: string; link: string }> = [
  {
    label: "Home",
    link: "/",
  },
];

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
      {children}
    </ThemeProvider>
  );
};

const Topbar: React.FC<{
  toggleDrawer: (open: any) => (event: any) => void;
  showMenu: boolean;
}> = ({ toggleDrawer, showMenu }) => (
  <AppBar position="sticky">
    <Toolbar>
      <Box className="top-bar-left">
        <Link to="/">
          <StaticImage
            alt="Logo Devfest 2021"
            src="../images/logos/devfest_color512.png"
            height={65}
            objectFit="contain"
          />
        </Link>
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

const TopMenu = () => (
  <List className="menu-desktop">
    <ListMenuButtons />
  </List>
);

const BarMenu: React.FC<{
  toggleDrawer: (open: any) => (event: any) => void;
  isOpen: boolean;
}> = ({ isOpen, toggleDrawer }) => (
  <Drawer
    anchor="right"
    variant="temporary"
    open={isOpen}
    onClose={toggleDrawer(false)}
  >
    <Box
      role="presentation"
      onKeyDown={toggleDrawer(true)}
      onClick={toggleDrawer(false)}
    >
      <List className="menu-mobile">
        <ListItemButton style={{ height: "75px" }}>
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
        <Link to={menuItem.link} activeClassName="active-link">
          <ListItemText>{menuItem.label}</ListItemText>
        </Link>
      </ListItemButton>
    ))}
  </>
);

export default Layout;
