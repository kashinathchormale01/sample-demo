import { List, Typography } from "@mui/material";
import Dropdown from "./SubmenuItem";

const MenuItems = ({ items }) => {
    return (
      <>
      <List sx={{padding:'0'}}>
        {items.submenu ? (         
            <Dropdown key="0" submenus={items.submenu} />         
        ) : (
          <Typography component={"span"} variant={"body2"} href={items.url}>{items.title}</Typography>  
        )}
        </List>
      
      </>
    );
  };
  
  export default MenuItems;