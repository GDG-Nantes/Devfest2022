import { CloseRounded, MenuRounded } from "@mui/icons-material";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import "./style.scss";
import theme from "./theme";

const Menu = [
  {
    label: "Home",
    link: "/",
  },
];

const Layout: React.FC = ({ children }) => {
  const [isOpen, setDrawerOpen] = React.useState(false);
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
      <AppBar position="sticky">
        <Toolbar>
          <Box style={{ flexGrow: 1 }}>
            <StaticImage
              alt="Logo Devfest 2021"
              src="../images/logos/devfest_color512.png"
              height={65}
              objectFit="contain"
            />
          </Box>

          <Box style={{ flexGrow: 0 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuRounded />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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
          <List>
            <ListItem button style={{ height: "75px" }}>
              <ListItemIcon>
                <CloseRounded />
              </ListItemIcon>
            </ListItem>
            <Divider />
            {Menu.map((menuItem) => (
              <ListItem button key={menuItem.label}>
                <Link to={menuItem.link}>
                  <ListItemText>{menuItem.label}</ListItemText>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {children}
    </ThemeProvider>
  );
};

export default Layout;
