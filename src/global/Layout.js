import React from 'react';
//  import React, { useState } from 'react';
//  import Login from '../component/Login';
import MiniDrawer from './sidebar/sidebar';

const Layout = () => {
    //  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <>
    <MiniDrawer />
    {/* {userLoggedIn ? <MiniDrawer /> : <Login />} */}
    </>
  )
}

export default Layout