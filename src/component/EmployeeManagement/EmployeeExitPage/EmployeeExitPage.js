import React, { useState, useEffect,useMemo} from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosHttp from "../../../AxiosInstance";

const FCWidth = {
  width: "20rem"
};


const EmployeeExitPage = () => {
const navigate = useNavigate();
  const [emplist, setEmplist] = useState([]);
  const [dateValue, setDateValue] = useState(dayjs());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const { register, control, handleSubmit, formState: { errors } } = useForm();


  const loadEmployees = async () => {      
    try {
      let result = await axiosHttp.get('/GetEmp');
      setEmplist(result.data.data);     
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
  
    useEffect(() => {
      loadEmployees();
    }, []);

    // console.log(emplist)
    const handleDateChange = (date) => {
      setDateValue(date);
      console.log('Onchange',date)      
    };
// console.log(dateValue)
  const formSubmitHandler = async (formData) => {
    console.log('Onchange',dayjs(dateValue).format('YYYY/MM/DD')) 
    console.log('Onsubmit',formData);
    const makePayload = {     
      doe:dayjs(dateValue).format('YYYY/MM/DD'),
      empId:formData.empid,
    }
    console.log(makePayload)
    try {
      let result = await axiosHttp.post('/DeleteEmp',makePayload);
      toast.error(result.data.msg)
      navigate('/employee-list');
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
 // Filter only active employees
const activeEmployees = emplist.filter(emp => emp.empstatus === 'Active');

  // const emps = [{id:1,label:'Kash'},{id:2,label:'MD'}];
  return (
   <>
    <div className="App">
    {activeEmployees.length === 0 ? (
        <Typography color="error">No active employees found.</Typography>
      ) : (
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Controller
          name="empid"
          control={control}
          type="text"
          defaultValue={''}
          {...register("empid", { required: true})}
          render={({ field }) => (
            <FormControl sx={FCWidth} error={errors?.empid?.type === "required"}>
              <InputLabel id="emp">Select Employee</InputLabel>
              <Select
                {...field}
                labelId="emp"
                label="emp"                
                defaultValue={''}
              >
                {activeEmployees.map((emp) => (
                  <MenuItem value={emp.Id} key={emp.Id}>
                    {emp.firstName + ' ' + emp.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        /> <br/>
        {errors?.empid?.type === "required" && <Typography color="error">Select employee for the exit or to make inactive</Typography>} 

        <LocalizationProvider dateAdapter={AdapterDayjs} error={errors?.doe?.type === "required"}>
            <DemoContainer
              sx={{ margin: "20px 0" }}
              components={["DatePicker"]}
            >
              <DatePicker
                label="Select a Date"
                name="doe"
                value={dateValue}
                control={control}
                onChange={(newValue) =>(handleDateChange(newValue))}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors?.doe?.type === "required" && <Typography color="error">Select date of exit</Typography>} 
        <FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: ".75rem", fontWeight: "bold" }}
          >
            Submit
          </Button>
        </FormControl>
      </form>
       )}
    </div>
   </>
  )
}

export default EmployeeExitPage