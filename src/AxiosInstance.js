import React from 'react';
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';


const axiosHttp = axios.create({
    baseURL: `http://192.168.1.121:8089/api`,
  });

axiosHttp.interceptors.request.use(
    (config) => {
        if(sessionStorage.getItem('token')){
      const token =  `Bearer ${sessionStorage.getItem('token')}`;
      console.log('token',token)
      return {
        ...config,
        headers: {
          ...(token !== null && { Authorization: `${token}` }),
          ...config.headers,
        },
      };
    }else{
        window.location.href = "/LoginError";
    }
    },
    (error) => {
        console.log('error in request',error)
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    (response) => {
       // const navigate = useNavigate();
        console.log('response in axios',response)
        if(response.data.msg.message === 'jwt expired' || response.data.msg.message === 'invalid signature' || response.data.msg.message === 'jwt malformed')
             // navigate('/LoginError')
        window.location.href = "/LoginError";
      //setLocalStorageToken(token);
      return response;
    },
    (error) => {
        console.log('error in axios',error.message)
      if (error.response.status === 401) {
        //(`unauthorized :)`);
        //localStorage.removeItem("persist:root");
        //removeLocalStorageToken
        console.log('unauthorized error',error.response.status)
        sessionStorage.removeItem('token');
        window.location.href = "/login";
      }else if (error.response.status === 404) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

export default axiosHttp