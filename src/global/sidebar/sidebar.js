import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SettingsIcon from "@mui/icons-material/Settings";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menuItemsData } from "./SideNavMenu";
import MenuItems from "./MenuItems";
import Header from "../header/Header";
import Routing from "../common/Routing";
import Appbreadcrumbs from "../header/Appbreadcrumbs";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ userRole}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const filteredMenuItems = () => {
    switch (userRole) {
      case "Super":
      case "Admin":
        return menuItemsData;
        case "HR":
          return menuItemsData.filter(
            (item) => item.sectionId === 1 || item.sectionId === 3
          );
      case "Supervisor":
        return menuItemsData.filter(
          (item) => item.sectionId === 1 || item.sectionId === 2
        );
      default:
        return [];
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {filteredMenuItems().map((text, index) => (
          <>
            <Accordion
              key={index}
              defaultExpanded={index === 0}
              sx={{
                margin: "20px 15px 0 15px",
                borderRadius: "10px",
                display: open ? "block" : "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {index === 0 && <PersonIcon color="primary" />}
                {index === 1 && <GroupIcon color="primary" />}
                {index === 2 && <AccountBalanceIcon color="primary" />}
                {index === 3 && <SummarizeIcon color="primary" />}
                {index === 4 && <SettingsIcon color="primary" />}
                {index === 5 && <ManageAccountsIcon color="primary" />}
                <Typography component={"span"} variant={"body2"}
                  sx={{
                    color: "#0000008a",
                    fontWeight: "700",
                    paddingLeft: "10px",
                  }}
                >
                  {text.section}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "8px 0px 16px 10px" }}>
                <MenuItems key={index} items={text} />
              </AccordionDetails>
            </Accordion>
          </>
        ))}

        <List sx={{ display: open ? "none" : "block" }}>
          {filteredMenuItems().map((text, index) => (
            <ListItem key={index} disableGutters={true}>
              <ListItemButton
               key={index}
                onClick={handleDrawerOpen}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <PersonIcon />}
                  {index === 1 && <GroupIcon />}
                  {index === 2 && <AccountBalanceIcon />}
                  {index === 3 && <SummarizeIcon />}
                  {index === 4 && <SettingsIcon />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2, mt: 8 }}>
        <Appbreadcrumbs />
        <Routing userRole={userRole} />
      </Box>
    </Box>
  );
}