import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputAdornment, IconButton, TextField, Button, Typography, Grid, Paper,CircularProgress } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import axiosHttp from "../../AxiosInstance";
import { toast } from "react-toastify";
const CryptoJS = require("crypto-js");

const ConfirmPassword = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedadminemp, setSelectedadminemp] = useState([]);
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      setSelectedadminemp(location.state);
    }, [location]);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const handleToggleCurrentPasswordVisibility = () => {
      setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const onSubmit = async (data) => {
      console.log("data", data);
      console.log("selectedadminemp", selectedadminemp);
      const hashedPassword = CryptoJS.AES.encrypt(
        data.password,
        "nks"
      ).toString();
      console.log("hashedPassword", hashedPassword);

      const defaultOrigionalBytes = CryptoJS.AES.decrypt(hashedPassword, "nks");
      const defaultOrigional = defaultOrigionalBytes.toString(
        CryptoJS.enc.Utf8
      );
      console.log("Id", defaultOrigional);
      console.log("passorigional", defaultOrigional);
      const sendingdata = {
        userId: sessionStorage.getItem("Id"),
        userPassword: hashedPassword,
        empidreset: selectedadminemp,
        roleID: "0",
      };
      console.log(sendingdata);
      try {
        setLoading(true);
        const res = await axiosHttp.post("/VerifyPassword", sendingdata);
        toast.success(res.data.msg);
        setLoading(false);
        navigate("/user-promoted-list");
      } catch (err) {
        setLoading(false);
        console.error(error);
      }
    };

    if (loading)
      return (
        <div className="overlay">
          <div className="loadingicon">
            <CircularProgress color="inherit" />
            <br />
            Loading...
          </div>
        </div>
      );

  return (
    <Paper sx={{ padding: '20pt', maxWidth: '500pt' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <Grid container spacing={2}>
       <Grid item xs={12}>
        <TextField
        type={currentPasswordVisible ? "text" : "password"}
          id="password"
          label="Confirm with Password"
          {...register('password', { required: 'Password is required' })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleCurrentPasswordVisibility}
                  edge="end"
                >
                  {currentPasswordVisible ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.password && (
              <Typography color="error">Password is required</Typography>
            )}
      </Grid>
      <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
      
      </Grid>
      
      </form>
    </Paper>
  )
}

export default ConfirmPassword