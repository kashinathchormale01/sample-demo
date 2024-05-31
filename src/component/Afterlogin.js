import React, { useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Afterlogin = () => {
  const navigate = useNavigate();
  const getauthenticion = ()=>{
    let data=[];
    axios
    .get("/Authenticate")
    .then((res) => {
      console.log("After Login authentication check");
      console.log(res);
      if(data.length)
      {
        alert("sucessfully login")
      }
      else
      {
        navigate("/LoginError");
      }
    })

  }
 
    useEffect(()=>{
      
       getauthenticion();
      
    })
  return (

    <div>Afterlogin</div>
    
  )
}

export default Afterlogin