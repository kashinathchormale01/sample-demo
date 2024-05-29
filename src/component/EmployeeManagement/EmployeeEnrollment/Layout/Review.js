import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Review = (data) => {

  

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <div style={{backgroundColor:"magenta"}}>
      <label style={{padding:5}}>Profile</label>
    <Grid container spacing={2} columns={16} sx={{padding:2}}>
      <Grid item xs={4}>
        <Item>Name</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.firstName}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.fatherSpouseName}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.lastName}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Gender</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.gender}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Date Of Birth</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{dayjs(  data.values.dateOfBirth).format("DD/MM/YYYY")}</Item>
        
      </Grid>
      <Grid item xs={4}>
        <Item>Aadhar Card Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.aadharNumber}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Nationality</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.nationality}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Education Level</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.educationLevel}</Item>
        
      </Grid>
      <Grid item xs={4}>
        <Item>Date of Joining</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{dayjs(  data.values.dateOfJoning).format("DD/MM/YYYY")}</Item>
      </Grid>
      
    </Grid>
    </div>

    <div style={{backgroundColor:"orange"}}>
    <label style={{padding:5}}>Bank Details</label>
    <Grid container spacing={2} columns={16} sx={{padding:2}}>
      <Grid item xs={4}>
        <Item>Bank Name</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.bankName}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Bank Account Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.bankAccountNumber}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>ifscCode</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.ifscCode}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>panNumber</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.panNumber}</Item>
        
      </Grid>
      <Grid item xs={4}>
        <Item>UAN Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.UAN}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>PF Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.pfNumber}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>esicIP Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.esicIP}</Item>
        
      </Grid>
      <Grid item xs={4}>
        <Item>LWF Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{  data.values.lwf}</Item>
      </Grid>
      


      
    </Grid>
    </div>


    <div style={{backgroundColor:"green"}}>
    <label style={{padding:5}}>Official Details</label>
    <Grid container spacing={2} columns={16} sx={{padding:2}}>
      <Grid item xs={4}>
        <Item>Register Site</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.siteId1}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Work Category</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.categoryId1}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Employee Designation</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.roleId1}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Service Book Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.serviceBookNumber}</Item>
        
      </Grid>
      <Grid item xs={4}>
        <Item> Service Remark</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.serviceRemark}</Item>
      </Grid>         
    </Grid>
    </div>

    <div style={{backgroundColor:"yellow"}}>
    <label style={{padding:5}}>Personal Details</label>
    <Grid container spacing={2} columns={16} sx={{padding:2}}>
      <Grid item xs={4}>
        <Item>Present Address</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.presentAddress}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Permanent Address</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.permanentAddress}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Mark Of Identification</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.markOfIdentification}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Mobile Nunber</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.mobileNumber}</Item>
        
      </Grid>
      <Grid item xs={4}>
        <Item> Alternate Mobile Number</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.alternateMobileNumber}</Item>
      </Grid>         
      <Grid item xs={4}>
        <Item> City Name</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{data.values.cityName1}</Item>
      </Grid>         
    </Grid>
    </div>
    
  </Box>
  )
}

export default Review