import React, { useState, useEffect,useMemo} from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BarChart } from '@mui/x-charts/BarChart';
import axiosHttp from "../../AxiosInstance";
const CryptoJS = require("crypto-js");

const MyAttendance = ({userRole}) => {
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [barchartdata, setBarchartdata] = useState();
  const { register, control, handleSubmit, formState: { errors } } = useForm();

  const handleDateChange = (date) => {
    setDateValue(date);  
  };

  const formSubmitHandler = async (formData) => {
    const bytes = await CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
    const originalId = await bytes.toString(CryptoJS.enc.Utf8);

    const makePayload = {
      year: parseInt(dayjs(dateValue).format("YYYY")),
      Id: parseInt(originalId),
    };
    console.log('makePayload',makePayload)
    try {
      setLoading(true);
      let result = await axiosHttp.post("/GetAttendanceId", makePayload);
    setBarchartdata(result.data.data)
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

  
  let plotmonthNames = barchartdata?.map((chart)=>{
    return chart.month;
  })

  let plotAtteCount = barchartdata?.map((chart)=>{
    return chart.AttendanceCount;
  })

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;

  return (
    <>
   { userRole !== 'Admin' && userRole !== 'Super' ? ( 
    <form onSubmit={handleSubmit(formSubmitHandler)}>
    <LocalizationProvider dateAdapter={AdapterDayjs} error={errors?.year?.type === "required"}>
            <DemoContainer
              sx={{ margin: "20px 0" }}
              components={["DatePicker"]}
            >
              <DatePicker
              views={['year']}
                label="Select a Year"
                name="year"
                value={dateValue}
                control={control}
                onChange={(newValue) =>(handleDateChange(newValue))}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors?.year?.type === "required" && <Typography color="error">Select Year</Typography>} 
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: ".75rem", fontWeight: "bold" }}
          >
            Show My Attendace
          </Button>
        </FormControl>
    </form>):''}   
  
{(userRole !== 'Admin' || 'Super') && barchartdata && (
        <BarChart
          xAxis={[{ scaleType: 'band', data: plotmonthNames }]}
          series={[{ data: plotAtteCount }]}
          width={700}
          height={300}
        />
      )}

      {(userRole !== 'Admin') ?'':(<Typography color="error">Admin account do not have attendace!!</Typography>)}
      {(userRole !== 'Super') ?'':(<Typography color="error">Admin account do not have attendace!!</Typography>)}

    </>
  )
}

export default MyAttendance