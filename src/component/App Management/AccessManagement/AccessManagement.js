import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LabelIcon from "@mui/icons-material/Label";
import { menuItemsData } from "./../../../global/sidebar/SideNavMenu";

const AccessManagement = () => {
  return (
    <>
      <Box className="sitemap-container">
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem
              className="topLabel"
              sx={{ backgroundColor: "#dd9f0e", color: "#fff" }}
            >
              <ListItemText>My Details</ListItemText>
            </MenuItem>
            <Divider />
            {menuItemsData
              .filter((item) => item.section === "My Details")
              .flatMap((item) => item.submenu)
              .map((subitem) => (
                <MenuItem key={subitem.url}>
                  <ListItemIcon>
                    <LabelIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Link color="text.secondary" to={`/../${subitem.url}`}>
                      {subitem.menu}
                    </Link>
                  </ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>

        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem
              className="topLabel"
              sx={{ backgroundColor: "#3498db", color: "#fff" }}
            >
              <ListItemText>Team Management</ListItemText>
            </MenuItem>
            <Divider />
            {menuItemsData
              .filter((item) => item.section === "Team Management")
              .flatMap((item) => item.submenu)
              .map((subitem) => (
                <MenuItem key={subitem.url}>
                  <ListItemIcon>
                    <LabelIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Link color="text.secondary" to={`/../${subitem.url}`}>
                      {subitem.menu}
                    </Link>
                  </ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>

        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem
              className="topLabel"
              sx={{ backgroundColor: "#07bc0c", color: "#fff" }}
            >
              <ListItemText>Finance</ListItemText>
            </MenuItem>
            <Divider />
            {menuItemsData
              .filter((item) => item.section === "Finance")
              .flatMap((item) => item.submenu)
              .map((subitem) => (
                <MenuItem key={subitem.url}>
                  <ListItemIcon>
                    <LabelIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Link color="text.secondary" to={`/../${subitem.url}`}>
                      {subitem.menu}
                    </Link>
                  </ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>

        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem
              className="topLabel"
              sx={{ backgroundColor: "#000", color: "#fff" }}
            >
              <ListItemText>Reports</ListItemText>
            </MenuItem>
            <Divider />
            {menuItemsData
              .filter((item) => item.section === "Reports")
              .flatMap((item) => item.submenu)
              .map((subitem) => (
                <MenuItem key={subitem.url}>
                  <ListItemIcon>
                    <LabelIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Link color="text.secondary" to={`/../${subitem.url}`}>
                      {subitem.menu}
                    </Link>
                  </ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>

        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem
              className="topLabel"
              sx={{ backgroundColor: "red", color: "#fff" }}
            >
              <ListItemText color="primary">App Management</ListItemText>
            </MenuItem>
            <Divider />
            {menuItemsData
              .filter((item) => item.section === "App Management")
              .flatMap((item) => item.submenu)
              .map((subitem) => (
                <MenuItem key={subitem.url}>
                  <ListItemIcon>
                    <LabelIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Link color="text.secondary" to={`/../${subitem.url}`}>
                      {subitem.menu}
                    </Link>
                  </ListItemText>
                </MenuItem>
              ))}
          </MenuList>
        </Paper>
      </Box>
    </>
  );
};

export default AccessManagement;
