import React from 'react';
import { useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';


const UserManagement = () => {
    const navigate = useNavigate();
    return (
      <>
      <Link color="inherit" onClick={() => navigate('/add-user')} style={{ cursor: 'pointer', textTransform:'capitalize' }}>
      Add New User
      </Link>
      </>
    )
}

export default UserManagement