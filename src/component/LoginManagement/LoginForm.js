import React,{useEffect} from "react";
import { Box, Grid, Paper,CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
 import loginimg from "../../Asset/Images/wallpaper.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { Login } from "@mui/icons-material";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const CryptoJS = require("crypto-js");

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [userId, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");

  const handlenoaccount = ()=>{
    toast.warning("Please contact to Administrator.")
  }

  const submitLogin = async()=>{
    if (!userId || !userPassword) {

      /**
       * Handle null or empty values
       */       
      console.log("User ID or password is missing");
      return;
    }

    /**
     * encrypt
     */
    const hashedPassword = CryptoJS.AES.encrypt(userPassword, "nks").toString();

    /**
     * Decrypt
     */
    const defaultOrigionalBytes = CryptoJS.AES.decrypt(hashedPassword, "nks");
    const defaultOrigional = defaultOrigionalBytes.toString(CryptoJS.enc.Utf8);
    // console.log('pass',hashedPassword);

    const sendingdata = {
      userId: userId,
      userPassword: hashedPassword,
      roleID: "0",
    };
    try {
      setLoading(true);
     // let res = await axios.post("http://192.168.1.121:8089/Login", sendingdata)
     const res = await axios.post("https://epdsback.onrender.com/Login", sendingdata)     
      if (res.data.msg === "Succesfull") {
          
        /**
         * set the 'token' after login Succesfull
         */          
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", res.data.Key);

        const hashedEmpId = CryptoJS.AES.encrypt(
          res.data.data[0].empId,
          "nks"
        ).toString();

         /**
         * set the employee 'Id' after login Succesfull
         */ 
        sessionStorage.removeItem("Id");
        sessionStorage.setItem("Id", hashedEmpId);
        if ("1234" === defaultOrigional) {
          sessionStorage.removeItem("rePass");
        sessionStorage.setItem("rePass", 'default');
         // window.location.replace("/change-password");
         window.location.href = '/change-password';
        } else {
          //window.location.replace("/my-profile");
          window.location.href = '/';
        }
      } else {
        sessionStorage.setItem("user", false);
        toast.error(res.data.msg);
        window.location.href = '/login';
      }  
     // setLoading(false);    
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

  const handleSubmit = async(e) => {
   // setLoading(true);
    console.log('click on login')
    e.preventDefault();
    

    submitLogin();
    
    

  };
  useEffect(() => {
    submitLogin();
  }, []);

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ height: "100vh" }}>
          <Grid
          className="LoginWrapper"
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
           
            sx={{ height: "100%", width: "100%", }}
          >
            {/* <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item
              xs={8}
              sx={{ height: "100%" }}
            >
             
              <div style={{ width: "100%" }}>
                <img
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                  src={loginimg}
                ></img>
              </div>
            </Grid> */}
            <Grid item xs={4}>
              <Item className="LoginContainer">
                <Grid item xs={12}>
                  <LockPersonIcon fontSize="large" sx={{ color: "red" }} />
                </Grid>
                <Grid item xs={12}>
                  <label>Sign in</label>
                </Grid>

                <Grid container>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "flex-end", marginTop:"10pt" }}>
                      {/* <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      /> */}
                      <TextField
                        fullWidth
                        id="usernametxt"
                        label="User Name"
                        variant="standard"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{marginTop:"10pt"}}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "flex-end",marginTop:"15pt" }}>
                      {/* <PasswordRoundedIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      /> */}
                      <TextField
                        fullWidth
                        id="passwordtxt"
                        label="Password"
                        variant="standard"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>{" "}
                  <Grid item xs={12}>
                    <Button
                    sx={{ marginTop:"15pt" }}
                      variant="contained"
                      type="sumbit"
                      size="large"
                      endIcon={<Login />}
                    >
                      {" "}
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{marginTop:"15pt" }}>
                    <Link onClick={handlenoaccount} to={`/`}>Dont Have an Account </Link>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
