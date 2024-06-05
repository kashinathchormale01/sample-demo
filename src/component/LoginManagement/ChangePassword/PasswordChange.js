import React,{useState} from 'react';
import ChangePasswordForm from "./ChangePasswordForm";
import { toast } from 'react-toastify';
import axiosHttp from '../../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const CryptoJS = require("crypto-js");

const PasswordChange = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSubmit = async(data) => {

       //encrypt
    const hashedNewPassword = CryptoJS.AES.encrypt(data.newPassword, 'nks').toString();
    console.log("hashedNewPassword",hashedNewPassword);

      //decrypt
    var bytes  = CryptoJS.AES.decrypt(hashedNewPassword, 'nks');
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    console.log("changedoriginalPassword",originalPassword);

      // Construct the payload with username and new password
      const payload = {
        userId: sessionStorage.getItem('Id'), 
        userPassword: hashedNewPassword,
      };
      // Send the payload to the backend or perform any necessary action
      console.log("Payload:", payload);

      try {
        let result = await axiosHttp.post('/UpdateTempPassword',payload);
      toast.success(result.data.msg);    
      navigate("/my-profile");    
        setLoading(false);
        // Work with the response...
    } catch (err) {
        if (err.response) {
          setLoading(false);
         // console.log('Status', err.response.status);
          setError(err.message);
            // The client was given an error response (5xx, 4xx)
            //console.log('Error response', err.message);
        } else if (err.request) {
          setLoading(false);
          setError(err.message);
            // The client never received a response, and the request was never left
           // console.log('Error Request', err.message);
        } else {
            // Anything else
            setLoading(false);
            setError(err.message);
          // console.log('Error anything', err.message);
        }
    }
    };
  return (
    <>
    <h2>Change Password</h2>
    <ChangePasswordForm onSubmit={handleSubmit} />
  </>
  )
}

export default PasswordChange