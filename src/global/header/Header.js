import * as React from 'react';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, Toolbar } from '@mui/material';
import { settings } from '../sidebar/SideNavMenu';
import { styled } from '@mui/material/styles';
import logoimg from '../../images/logo.png';

const Header = () => {
    // const theme = useTheme();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const useStyles = styled('img')(({ theme }) => ({
        logo: {
            maxWidth: 60,
          },
      }));
  return (
    <>
        <Toolbar sx={{Padding:'0 10px'}}>
        <img src={logoimg} height={60} alt="logo" className={useStyles.logo} />
      </Toolbar>

      <Typography variant="h6" color="inherit" noWrap>
        Employee Management System
      </Typography>
      <IconButton
        disableRipple
        color="inherit"
        aria-label="Github"
        sx={{ ml: "auto" }}
        size="large"
      >
        <>
          <Typography variant="h6" color="inherit" sx={{ marginRight: "10px" }}>
           
            Welcome
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#ffe200", marginRight: "10px" }}
          >
            John Due
          </Typography>
          <Tooltip title="Open settings">
            <Link onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* <Avatar></Avatar> */}
              <AccountCircleIcon fontSize='large' sx={{ color: "#ffffff" }} />
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
          {settings.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              <Typography textAlign="center" sx={{color:'#1976d2'}}>
                <Link underline="none" key={setting.code} color='inherit' href={setting.link}> {setting.name}</Link>
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </IconButton>
    </>
  )
}

export default Header
