// import React from 'react';
 import React, { useState, useEffect } from 'react';
//  import Login from '../component/Login';
import MiniDrawer from './sidebar/sidebar';
import LoginForm from '../component/LoginManagement/LoginForm';

const Layout =  () => {
    // const [userLoggedIn, setUserLoggedIn] = useState();
     //console.log(userLoggedIn)
  const userLoggedIn = sessionStorage.getItem('token');
    //   function setUserLoggedIn(){
    //   return 
    //  }
    

  return (
    <>
    {/* <MiniDrawer /> */}
    {userLoggedIn?.length>4 ? <MiniDrawer /> : <LoginForm />}
    {/* {userLoggedIn === 'true' ? <MiniDrawer /> : <LoginForm />} */}
    
    </>
  )
}

export default Layout