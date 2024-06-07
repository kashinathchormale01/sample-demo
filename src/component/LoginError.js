import React from 'react'
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

import LoginIcon from '@mui/icons-material/Login';
import Stack from '@mui/material/Stack';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const LoginError = () => {
    const navigate = useNavigate();
    const handleevent =() =>{
        navigate("/Login");
    }


  return (
   <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid xs>
          
        </Grid>
        <Grid xs={6} alignItems="centre" height="100vh" justifyContent="center" alignContent={"center"}>
            <Stack direction={"column"} spacing={2}>
          <Item ><label> The Credentials Expired </label><br/>
          <label>Please Login Again </label></Item>
          <Button variant="contained" endIcon={<LoginIcon />} onClick={handleevent}>
      Login
      </Button>
      </Stack>
        </Grid>
        <Grid xs>
          
        </Grid>
      </Grid>
    </Box>
   </>
  )
}

export default LoginError