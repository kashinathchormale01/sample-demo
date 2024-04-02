import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Appbreadcrumbs = () => {
    let navigate = useNavigate();
  let location = useLocation();
  let currentRoutes = []
  currentRoutes = location.pathname !== '/' ? location.pathname.split('/') : [];

  if (currentRoutes.length > 0) {
    currentRoutes.shift();

  return (
    <>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{ marginBottom: 15 }}>
    <Link color="inherit" onClick={() => navigate('/')} style={{ cursor: 'pointer', textTransform:'capitalize' }}>
    Home
    </Link>
    {
    currentRoutes.length === 1
    ? <Typography color="textPrimary" sx={{textTransform:'capitalize'}}>{currentRoutes[0]}</Typography>
    : currentRoutes.map((route, index) => {
    return (index !== currentRoutes.length - 1
    ? <Link key={index} color="inherit" style={{ cursor: 'pointer' }} onClick={() => {
    navigate(route)
    }} >
    {route}
    </Link>
    : <Typography key={index} color="textPrimary">{route}</Typography>)
    })
    }
    </Breadcrumbs>
    </>
  )
  }
}

export default Appbreadcrumbs