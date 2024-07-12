import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import { toast } from "react-toastify";
import axiosHttp from "../../../AxiosInstance";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const CryptoJS = require("crypto-js");

const PasswordChange = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    /**
     * Encrypt goes here
     */    
    const hashedNewPassword = CryptoJS.AES.encrypt(
      data.newPassword,
      "nks"
    ).toString();
    console.log("hashedNewPassword", hashedNewPassword);

     /**
      * decrypt
      */      
    // const bytes = CryptoJS.AES.decrypt(hashedNewPassword, "nks");
    // const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("changedoriginalPassword", originalPassword);

    /**
     * Construct the payload with username and new password
     */
    const payload = {
      userId: sessionStorage.getItem("Id"),
      userPassword: hashedNewPassword,
    }

    try {
      let result = await axiosHttp.post("/UpdateTempPassword", payload);
      toast.success(result.data.msg);
    //  navigate("/my-profile");
    sessionStorage.removeItem("Id");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('rePass');
    window.location.href = '/login';
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
  };

  if (loading)
    return (
      <>
        Loading...
        <CircularProgress />
      </>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="ChangePasswrapper">
        <h2>Change Password</h2>
        <ChangePasswordForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default PasswordChange;
