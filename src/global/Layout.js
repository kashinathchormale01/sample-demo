import React from 'react';
import MiniDrawer from './sidebar/sidebar';
import LoginForm from '../component/LoginManagement/LoginForm';

const Layout =  () => {    
  const userLoggedIn = sessionStorage.getItem('token');
  return (
    <>    
      {userLoggedIn?.length>4 ? <MiniDrawer /> : <LoginForm />}
    </>
  )
}

export default Layout