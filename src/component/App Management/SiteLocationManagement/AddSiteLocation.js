import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputAdornment, IconButton, Box, TextField, Button, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axiosHttp from "../../../AxiosInstance";

const AddSiteLocation = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const location = useLocation();
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      const sendingdata = {
        userId: sessionStorage.getItem("Id"),
        siteName: data.siteName,
        siteArea: data.siteArea,
        creationDate: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
      };
      try {
        setLoading(true);
        const res = await axiosHttp.post("/SaveProj_Site", sendingdata);
        toast.success(res.data.msg);
        setLoading(false);
        navigate("/work-location-management");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
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
      
     
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    >
              <TextField
                id="siteName"
                label="Site Name"
                {...register('siteName', { required: 'Site Name is required' })}
                error={Boolean(errors.siteName)}
                  helperText={errors.siteName?.message}
              />  
              <TextField
                id="siteArea"
                label="Site Area"
                {...register('siteArea', { required: 'Site Area is required' })}
                error={Boolean(errors.siteArea)}
                  helperText={errors.siteArea?.message}
              />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              disableFuture
              id="creationDate"
                label="Creation Date"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                textField={(params) => <TextField {...params} />} 
                error={Boolean(errors.creationDate)}
                helperText={errors.creationDate}              
              />             
              </LocalizationProvider>
              </Box>

              <Box>
            <Grid item xs={12} sx={{marginTop:'15pt'}}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
            </Box>
        </form>
       
       
    );
};

export default AddSiteLocation;
