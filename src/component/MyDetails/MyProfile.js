import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper,Stack,Typography,Divider } from '@mui/material';
import axios from 'axios';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { green } from '@mui/material/colors';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosHttp from '../../AxiosInstance';
import { set } from 'react-hook-form';
const CryptoJS = require("crypto-js");

const MyProfile = () => {

  // const [selectedEmpID, setSelectedEmpID] = useState();
  const [selectedEmp, setSelectedEmp] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSelectedEmployee();
  }, []);  
 
  const loadSelectedEmployee = async () => {      
    try {
      let encryptedId = sessionStorage.getItem('Id');
      if (!encryptedId) {
        console.log("No encrypted ID found in sessionStorage");
        window.location.href = "/login";
        return;
      }else{
        let bytes  = await CryptoJS.AES.decrypt(sessionStorage.getItem('Id'), 'nks');
    let originalPassword = await bytes.toString(CryptoJS.enc.Utf8);      
      let result = await axiosHttp.get(`/GetEmp/${originalPassword}`);
      setSelectedEmp(result.data.data[0]);    
    }
  } catch (err) {
    console.log('profile',err);    
      if (err.response) {
        setError(err.message);
        console.log('profile',error);   
      } else if (err.request) {
        setError(err.message);
        console.log('profile',error); 
      } else {
          // Anything else
          setError(err.message);
          console.log('profile',error);    
      }
  }
    
  };

 

  if (error) return `Error: ${error.message}`;
  // if (error) return useNavigate('/login');
  if (!selectedEmp) return "No Data!"



  return (
    <>
    
    <Box className="wrapper-main">
    <Typography variant='h4' sx={{color:'#808080', fontSize:'28px', fontWeight:'500', marginBottom:'20px'}}>Good Morning!!..{selectedEmp.firstName}</Typography>
    
      <Paper sx={{ marginTop:'20px', padding: "10px" }}>
      <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        > <Typography sx={{color:'#1f93ce'}}>Employee Information summary</Typography></Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Designation</Typography>
          <Typography className='summaryData'>{selectedEmp.designation1}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Site Locaion</Typography>
          <Typography className='summaryData'>{selectedEmp.siteName}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Present Address</Typography>
          <Typography className='summaryData'>{selectedEmp.presentAddress}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Permanent Address</Typography>
          <Typography className='summaryData'>{selectedEmp.permanentAddress}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>city Name</Typography>
          <Typography className='summaryData'>{selectedEmp.cityName}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Mobile</Typography>
          <Typography className='summaryData'>{selectedEmp.mobileNumber}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Alternate Mobile Number</Typography>
          <Typography className='summaryData'>{selectedEmp.alternateMobileNumber}</Typography>
        </Stack>
      </Paper>
      
      </Box>
      {/* <Gauge
      height={200}
  value={75}
  startAngle={0}
  endAngle={360}
  innerRadius="80%"
  outerRadius="100%"
  text={
    ({ value, valueMax }) => `Attendance: ${value} %`
 }
 sx={(theme) => ({
  [`& .${gaugeClasses.valueText}`]: {
    fill: green,
  },
})}
  // ...
/>

<BarChart
      xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] }]}
      series={[{ data: [25,21,30,22,11,28,26,12,0,0,23,27]}]}
      width={700}
      height={300}
    />
<PieChart
colors={['orange', '#02b2af']}
      series={[
        {
          data: [
            { id: 0, value: 10, color:'#02b2af', label: 'Total Present days' },
            { id: 1, value: 15, color:'orange', label: 'Total Absent days' },
          ],
        },
      ]}
      width={500}
      height={200}
    /> */}
    </>
  );
}

export default MyProfile