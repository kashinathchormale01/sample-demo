import * as React from 'react';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';

const Dropdown = ({ submenus }) => {
  const location = useLocation();

  return (
    <>
      {submenus.map((submenu, index) => (
        <List key={index} sx={{
          // selected and (selected + hover) states
          padding:'0',
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: '#02b2af',
            '&, & .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
          // hover states
          '& .MuiListItemButton-root:hover': {
            '&, & .MuiTypography-body1': {
              color: '#1f93ce',
            },
          },             
            
        }}>
          <Divider />      
          <ListItem sx={{ padding:'0' }}>
            <ListItemButton
              component={Link}
              to={"/" + submenu.url}
              selected={location.pathname === "/" + submenu.url}
              sx={{ padding:'0' }}
            >
              <ListItemText
                primaryTypographyProps={{ fontSize: '14px', padding:'10px' }}
                primary={submenu.menu}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ))}
    </>
  );
};
  
export default Dropdown;
