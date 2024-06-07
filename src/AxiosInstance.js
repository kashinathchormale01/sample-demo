import axios from 'axios';

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
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    (response) => {
        if(response.data.msg.message === 'jwt expired' || response.data.msg.message === 'invalid signature' || response.data.msg.message === 'jwt malformed')
         window.location.href = "/LoginError";
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = "/login";
      }else if (error.response.status === 404) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

export default axiosHttp