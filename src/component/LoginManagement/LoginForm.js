import React,{useEffect} from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import loginimg from "../../Asset/Images/Deep1.jpg";
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

  // sessionStorage.setItem("user", false);


  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Started");
   

    let sendingdata = {
     
        userId: userId,
        userPassword: userPassword,
        roleID: "0",
      
    };
    axios
      .post("http://192.168.1.121:8089/Login", sendingdata)
      .then((res) => {
       console.log(res);
        if(res.data.msg==="Succesfull")
        {
        console.log("success");
      
        toast.success('User LoggedIn '+res.data.msg);
        sessionStorage.setItem("user", true);
         sessionStorage.setItem("token",res.data.Key);

        //  navigate("/my-profile");
         window.location.replace("/my-profile");
        }
        else
        {
          sessionStorage.setItem("user", false);
          toast.error(res.data.msg);
          console.log("Session Invalid");
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
                  {/* <TextField 
                    fullWidth

                  size="large"
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                /> */}
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
                  <Link to={`/`}>Dont Have an Account </Link>
                </Grid>
              </Grid>
            </Item>
          </Grid>

          {/* <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>

        <Grid item xs={4} md={4}>
          <Item>xs=4</Item>
        </Grid>

        <Grid item xs={4} md={4}>
          <Item>xs=4</Item>
        </Grid>

        <Grid item xs={4} md={4}>
          <Item>xs=4</Item>
        </Grid> */}
        </Grid>
      </Box>
    </form>
    </>
  )
}

export default LoginForm