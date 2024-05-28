// import React from 'react';
 import React, { useState, useEffect } from 'react';
//  import Login from '../component/Login';
import MiniDrawer from './sidebar/sidebar';
import LoginForm from '../component/LoginManagement/LoginForm';

const Layout = () => {
     const [userLoggedIn, setUserLoggedIn] = useState(sessionStorage.getItem('user'));
     console.log(userLoggedIn)

     useEffect(() => {
      sessionStorage.setItem('user', userLoggedIn);
  }, [userLoggedIn]);

  return (
    <>
    {/* <MiniDrawer /> */}
    {userLoggedIn ? <MiniDrawer /> : <LoginForm />}
    {/* {userLoggedIn === 'true' ? <MiniDrawer /> : <LoginForm />} */}
    </>
  )
}

export default Layout