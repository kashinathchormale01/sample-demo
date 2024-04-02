
import axios from "axios";
import React, { useState, useEffect} from "react";
import { Grid, Typography } from "@mui/material";

const baseURL = "http://192.168.1.121:8089/api/GetEmp";

const EmployeeList = () => {
  const [emplist, setEmplist] = useState(null);
  const [error, setError] = useState(null);
// const [post, setPost] = React.useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        setEmplist(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

//   if (!emplist) return null;
  if (error) return `Error: ${error.message}`;
  if (!emplist) return "No post!"

  return (
    <>
      {emplist.map((emp, index) => (
        <Grid key={emp.ID} p={2} sx={{backgroundColor:'#eeeeee'}}>
          <Typography gutterBottom>
            <label>Name:</label>
            {`${emp.Fname}`} {`${emp.Mname}`}
          </Typography>
          <Typography gutterBottom>
            <label>Last Name:</label>
            {`${emp.Mname}`}
          </Typography>
          <Typography gutterBottom>
            <label>Gender: </label>
            {`${emp.Gender}`}
          </Typography>
          <Typography gutterBottom>
            <label>Date Of Birth: </label>
            {`${emp.Doj}`}
          </Typography>
          <Typography gutterBottom>
            <label>Aadhar Number: </label>
            {`${emp.Adharno}`}
          </Typography>
          <Typography gutterBottom>
            <label>Fathers/Spouse Name: </label>
            {`${emp.Lname}`}
          </Typography>
          <Typography gutterBottom>
            <label>Nationality: </label>
            {`${emp.Nationality}`}
          </Typography>
          <Typography gutterBottom>
            <label>Education Level: </label>
            {`${emp.Eductionlvll}`}
          </Typography>

        </Grid>
        // <ul>
        //       <li key={post.id}>
        //         <span>{post.title}</span>
        //         <span>{post.body}</span>
        //       </li>
        // </ul>
      ))}
    </>
  );
};

export default EmployeeList;
