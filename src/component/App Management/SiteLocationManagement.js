import React from 'react';
import { useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';

const SiteLocationManagement = () => {
    const navigate = useNavigate();
  return (
    <>
    <Link color="inherit" onClick={() => navigate('/add-site-location')} style={{ cursor: 'pointer', textTransform:'capitalize' }}>
    Add New Site location
    </Link>
    </>
  )
}

export default SiteLocationManagement