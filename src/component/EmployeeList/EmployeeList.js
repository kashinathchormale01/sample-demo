import axios from "axios";
import React, { useState, useEffect} from "react";
import { Grid, Typography,FormControlLabel,Checkbox } from "@mui/material";

// const baseURL = "http://192.168.1.121:8089/api/GetEmp";

const EmployeeList = () => {
  const [emplist, setEmplist] = useState(null);
  const [error, setError] = useState(null);
// const [post, setPost] = React.useState(null);
const [selectedCheckbox, setSelectedCheckbox] = useState();

  useEffect(() => {
    axios
      .get('/GetEmp')
      .then((response) => {
        console.log(response.data);
        setEmplist(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
  
    setSelectedCheckbox(event.target.value)
   
  }

//   if (!emplist) return null;
  if (error) return `Error: ${error.message}`;
  if (!emplist) return "No post!"

  return (
    <>
      {emplist.map((emp, index) => (
        <Grid key={emp.Id} p={2} sx={{backgroundColor:'#eeeeee'}}>
          {/* <Typography gutterBottom>
            <label>Name:</label>
            {`${emp.firstName}`} {`${emp.lastName}`}
          </Typography>
          <Typography gutterBottom>
            <label>Last Name:</label>
            {`${emp.lastName}`}
          </Typography>
          <Typography gutterBottom>
            <label>Gender: </label>
            {`${emp.gender}`}
          </Typography>
          <Typography gutterBottom>
            <label>Date Of Birth: </label>
            {`${emp.dateOfBirth}`}
          </Typography>
          <Typography gutterBottom>
            <label>Aadhar Number: </label>
            {`${emp.aadharNumber}`}
          </Typography>
          <Typography gutterBottom>
            <label>Fathers/Spouse Name: </label>
            {`${emp.fatherSpouseName}`}
          </Typography>
          <Typography gutterBottom>
            <label>Nationality: </label>
            {`${emp.nationality}`}
          </Typography>
          <Typography gutterBottom>
            <label>Education Level: </label>
            {`${emp.educationLevel}`}
          </Typography>
          <Typography gutterBottom>
            <label>Bank Name: </label>
            {`${emp.bankName}`}
          </Typography>
          <Typography gutterBottom>
            <label>Bank Account Number: </label>
            {`${emp.bankAccountNumber}`}
          </Typography> */}
          <Typography gutterBottom>
          <FormControlLabel
          
          value={emp.Id}
          checked={emp.Id == selectedCheckbox}
          control={<Checkbox onChange={handleCheckboxChange} />}
          label={emp.firstName}
          labelPlacement="left"
        />
          </Typography>

        </Grid>
        
      ))}
    </>
  );
};

export default EmployeeList;
