import React from 'react';
// import React, { useState } from 'react';
// import Login from '../component/Login';
import MiniDrawer from './sidebar/sidebar';

const Layout = () => {
    // const [role, setRole] = useState(false);

  return (
    <>
    <MiniDrawer />
    {/* {role ? <Login /> : <MiniDrawer />} */}
    </>
  )
}

export default Layout