import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
// import loginimg from "../../Asset/Images/Deep1.jpg";
// import loginimg from "../../Asset/Images/Deep.webp";
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
  const [userId, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");

  const handlenoaccount = ()=>{
    toast.error("Please contact to Administrator.")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
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
    axios
      .post("https://epdsback.onrender.com/Login", sendingdata)
      .then((res) => {
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
            //navigate("/change-password",{replace: true});
           // window.location.replace("/change-password");
           window.location.href = '/change-password';
          } else {
            //window.location.replace("/my-profile");
            window.location.href = '/my-profile';
            // navigate("/errorpage",{replace: true});
            // navigate("/my-profile",{replace: true});
          }
        } else {
          sessionStorage.setItem("user", false);
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ height: "100vh" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ height: "100%", width: "100%", p: 1, mx: 1 }}
          >
            <Grid
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
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Grid item xs={12}>
                  <LockPersonIcon fontSize="large" sx={{ color: "red" }} />
                </Grid>
                <Grid item xs={12}>
                  <label>Sign in</label>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        fullWidth
                        id="usernametxt"
                        label="User Name"
                        variant="standard"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <PasswordRoundedIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
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
                      variant="contained"
                      type="sumbit"
                      size="large"
                      endIcon={<Login />}
                    >
                      {" "}
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
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
