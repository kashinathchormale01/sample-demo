import React, { useState } from 'react';
import Login from '../component/Login';
import MiniDrawer from './sidebar/sidebar';

const Layout = () => {
    const [role, setRole] = useState(false);

  return (
    <>
    {/* <Login /> */}
    {role ? <Login /> : <MiniDrawer />}
    </>
  )
}

export default Layout