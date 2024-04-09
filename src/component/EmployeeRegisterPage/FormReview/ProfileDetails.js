import React from 'react';
import { Typography, Grid } from '@mui/material';

function ProfileDetails(props) {
  const { formValues } = props;
//   const classes = useStyles();
  const { firstName,
    lastName,
    gender,
    dateOfBirth,
    aadharNumber,
    fatherSpouseName,
    nationality,
    educationLevel,
    dateOfJoning, } = formValues;
  return (
    <Grid item xs={12} sm={12}>    

      <Grid item xs={12} sm={12} className='SummaryMain'>
      <Typography variant="h6" gutterBottom sx={{textAlign:'center',color:'#1f93ce'}}>
        Profile Details
      </Typography>
        <Typography gutterBottom>
          <label>First Name:</label>
          {`${firstName}`}
        </Typography>
        <Typography gutterBottom>
          <label>Last Name:</label>
          {`${lastName}`}
        </Typography>
        <Typography gutterBottom>
          <label>Gender:</label>
          {`${gender}`}
        </Typography>
        <Typography gutterBottom>
          <label>Aadhar Number: </label>
          {`${aadharNumber}`}
        </Typography>
        <Typography gutterBottom>
          <label>Father/Spouse Name: </label>
          {`${fatherSpouseName}`}
        </Typography>
        <Typography gutterBottom>
          <label>Nationality: </label>
          {`${nationality}`}
        </Typography>
        <Typography gutterBottom>
          <label>Education Level:</label> {`${educationLevel}`}
        </Typography>
        <Typography gutterBottom>
          <label>Date Of Birth: </label>
          {`${dateOfBirth}`}
        </Typography>
        <Typography gutterBottom>
          <label>Date Of Joning:</label> {`${dateOfJoning}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ProfileDetails;
