import React, { useEffect, useState } from "react";
import MiniDrawer from './sidebar/sidebar';
import LoginForm from '../component/LoginManagement/LoginForm';
import axiosHttp from '../AxiosInstance';
import PasswordChange from "../component/LoginManagement/ChangePassword/PasswordChange";
const CryptoJS = require("crypto-js");

const Layout =  () => {    
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState();
  const userLoggedIn = sessionStorage.getItem('token');
  const defaultPass = sessionStorage.getItem('rePass');

  const getrolename = async()=>{
    try {
      const bytesempId = CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
      const originalempId = bytesempId.toString(CryptoJS.enc.Utf8);
      let result = await axiosHttp.get(`/GetEmp/${originalempId}`);
      setSelectedEmp(result.data.data[0]);     
      setLoading(false);    
  } catch (err) {
      if (err.response) {
        setLoading(false);    
        setError(err.message);       
      } else if (err.request) {
        setLoading(false);
        setError(err.message);      
      } else {
          // Anything else
          setLoading(false);
          setError(err.message);     
      }
  }
  }  
  
    useEffect(() => {
      getrolename();
    }, []);


    //console.log('selectedEmp',selectedEmp?.SupperAccess)

  return (
    <>    
      {userLoggedIn?.length>4 ? (defaultPass? <PasswordChange />:<MiniDrawer key="0" userRole={selectedEmp?.SupperAccess} />): <LoginForm />}
    </>
  )
}

export default Layout