import React, { useEffect, useState } from "react";
import axiosHttp from "../../AxiosInstance";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import logoimg from "../../images/logo.png";
const CryptoJS = require("crypto-js");

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedEmp, setSelectedEmp] = useState();
  const [error, setError] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    console.log("Logout called");
    sessionStorage.clear();
    setAnchorElUser(null);
    // window.location.href = "/login";
    window.location.href = "/";

  };

  const loadSelectedEmployee = async () => {
    try {
      const encryptedId = sessionStorage.getItem("Id");
      if (!encryptedId) {
        console.log("No encrypted ID found in sessionStorage");
        window.location.href = "/login";
        return;
      } else {
        const bytesempId = CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
        const originalempId = bytesempId.toString(CryptoJS.enc.Utf8);
        const result = await axiosHttp.get(`/GetEmp/${originalempId}`);
        setSelectedEmp(result.data.data[0]);
      }
    } catch (err) {
      console.log("profile", err);
      if (err.response) {
        setError(err.message);
        console.log("profile", error);
      } else if (err.request) {
        setError(err.message);
        console.log("profile", error);
      } else {
        // Anything else
        setError(err.message);
        console.log("profile", error);
      }
    }
  };

  useEffect(() => {
    loadSelectedEmployee();
  }, []);

  const useStyles = styled("img")(({ theme }) => ({
    logo: {
      maxWidth: 60,
    },
  }));
  return (
    <>
      <Toolbar sx={{ Padding: "0 10px" }}>
      <a href="/"> <img src={logoimg} height={60} alt="logo" className={useStyles.logo} /></a>
      </Toolbar>

      <Typography variant="h6" component={"span"} color="inherit" noWrap>
        Employee Management System
      </Typography>
      {selectedEmp ? (
      <IconButton
        disableRipple
        color="inherit"
        aria-label="Github"
        sx={{ ml: "auto" }}
        size="large"
      >
        <>
       
          <Typography variant="h6" component={"span"} color="inherit" sx={{ marginRight: "10px" }}>
            Welcome
          </Typography>
          <Typography
            variant="h6" component={"span"}
            sx={{ color: "#ffe200", marginRight: "10px" }}
          >
            {selectedEmp?.firstName} {selectedEmp?.lastName}
          </Typography>
          <Tooltip title="Open settings">
            <Link onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon fontSize="large" sx={{ color: "#ffffff" }} />
            </Link>
          </Tooltip>
        </>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography component={"span"} variant={"body2"} textAlign="center" sx={{ color: "#1976d2" }}>
              <Link underline="none" color="inherit" href="/my-profile">
                Profile
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography component={"span"} variant={"body2"} textAlign="center" sx={{ color: "#1976d2" }}>
              <Link underline="none" color="inherit">
                Logout
              </Link>
            </Typography>
          </MenuItem>
        </Menu>
      </IconButton> ) : null}
    </>
  );
};

export default Header;
