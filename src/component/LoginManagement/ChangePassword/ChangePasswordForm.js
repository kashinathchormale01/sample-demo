import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputAdornment, IconButton, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePasswordForm = ({ onSubmit }) => {
  const [passwordsMatch, setPasswordsMatch] = useState(); 
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch 
  } = useForm();

  const handleToggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const handleToggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleToggleConfirmNewPasswordVisibility = () => {
    setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
  };

  const currentPassword = watch("currentPassword", "");
  const newPassword = watch("newPassword", "");
  const confirmNewPassword = watch("confirmNewPassword", "");

  const onSubmitForm = (data) => {
    if (currentPassword !== newPassword) {
        onSubmit(data);
      console.log('NOt same password')
    } else {
      alert('You have entered new password as current password!!!')
      return;
    }    
  };

  useEffect(() => {
    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <Paper sx={{ padding: '20pt', maxWidth: '500pt' }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type={currentPasswordVisible ? "text" : "password"}
              id="currentPassword"
              label="Current Password"
              {...register("currentPassword", { required: true })}
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
            {errors.currentPassword && (
              <Typography color="error">Current Password is required</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={newPasswordVisible ? "text" : "password"}
              id="newPassword"
              label="New Password"
              {...register("newPassword", { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleNewPasswordVisibility}
                      edge="end"
                    >
                      {newPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.newPassword && (
              <Typography color="error">New Password is required</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={confirmNewPasswordVisible ? "text" : "password"}
              id="confirmNewPassword"
              label="Confirm New Password"
              {...register("confirmNewPassword", { required: true })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmNewPasswordVisibility}
                      edge="end"
                    >
                      {confirmNewPasswordVisible ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmNewPassword && (
              <Typography color="error">Confirm New Password is required</Typography>
            )}
            {!passwordsMatch && (
              <Typography color="error">Passwords do not match</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" disabled={!passwordsMatch}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ChangePasswordForm;
