import { List, Typography } from "@mui/material";
import Dropdown from "./SubmenuItem";

const MenuItems = ({ items }) => {
    return (
      <>
      <List disablePadding>
        {items.submenu ? (         
            <Dropdown submenus={items.submenu} />         
        ) : (
          <Typography href={items.url}>{items.title}</Typography>  
        )}
        </List>
      
      </>
    );
  };
  
  export default MenuItems;