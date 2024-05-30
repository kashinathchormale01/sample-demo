import * as React from 'react';
import { Paper, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';


export default function FormPageLayout(props) {
  const { children } = props;
  

  return (    
    <Box
    sx={{
      display: 'flex',
      justifyContent:'center',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,  
        p:1     
      }
    }}
  >   
    <Paper elevation={3} >{children}</Paper>
  </Box>
  );
}
