import * as React from 'react';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link, useLocation } from "react-router-dom";

const Dropdown = ({ submenus }) => {
    return (
      <>
        {submenus.map((submenu, index) => (
          <List key={index} sx={{
            // selected and (selected + hover) states
            padding:'0',
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: 'red',
              '&, & .MuiListItemIcon-root': {
                color: 'pink',
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
           <ListItem sx={{padding:'0'}}>
           <ListItemButton key={index} component={Link} to={"/" + submenu.url} selected={useLocation.pathname === submenu.url} sx={{padding:'0'}}>
             <ListItemText primaryTypographyProps={{fontSize: '14px', padding:'10px'}} primary={submenu.menu} />
           </ListItemButton>
         </ListItem>
         </List>
        ))}
      </>
    );
  };
  
  export default Dropdown;