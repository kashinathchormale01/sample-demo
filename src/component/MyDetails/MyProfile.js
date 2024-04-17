import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper,Stack,Typography,Divider } from '@mui/material';
import axios from 'axios';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { green } from '@mui/material/colors';


const MyProfile = () => {
  const [selectedEmpID, setSelectedEmpID] = useState(4);
  const [selectedEmp, setSelectedEmp] = useState();
  const [error, setError] = useState(null);

  function loadSelectedEmployee() {
    axios
      .get(`/GetEmp/${selectedEmpID}`)
      .then((res) => {
        console.log(res);
        console.log(JSON.stringify(res.data.data[0]));
        //setSavedsites(res.data.data[0]);
        setSelectedEmp(res.data.data[0]);
      }).catch((error) => {
        setError(error);
      });
    // console.log('savedSiteDataonload',savedSiteData);
  }
  useEffect(() => {
    loadSelectedEmployee();
  }, []);  

  if (error) return `Error: ${error.message}`;
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
          <Typography className='summaryData'>{selectedEmp.designation}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>Site Locaion</Typography>
          <Typography className='summaryData'>{selectedEmp.siteLocaion}</Typography>
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
      <Gauge
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
    </>
  );
}

export default MyProfile