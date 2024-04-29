import React from 'react';
import { Typography, Grid } from '@mui/material';

function CommBioDetails(props) {
  const { formValues } = props;
//   const classes = useStyles();
  const { presentAddress,
    permanentAddress,
    cityName,
    markOfIdentification,
    mobileNumber,
    alternateMobileNumber } = formValues;
  return (
    <Grid item xs={12} sm={12}>   
      <Grid item xs={12} sm={12} className='SummaryMain'>
      <Typography variant="h6" gutterBottom sx={{textAlign:'center',color:'#1f93ce'}}>
        Communication and Bio Details
      </Typography>
        <Typography gutterBottom>
          <label>Present Address: </label>
          {`${presentAddress}`}
        </Typography>
        <Typography gutterBottom>
          <label>Permanent Address: </label>
          {`${permanentAddress}`}
        </Typography>
        <Typography gutterBottom>
          <label>City Name/Area: </label>
          {`${cityName}`}
        </Typography>
        <Typography gutterBottom>
          <label>markOfIdentification: </label>
          {`${markOfIdentification}`}
        </Typography>
        <Typography gutterBottom>
          <label>mobileNumber: </label>
          {`${mobileNumber}`}
        </Typography>
        <Typography gutterBottom>
          <label>Alternate Mobile Number: </label>
          {`${alternateMobileNumber}`}
        </Typography>       
      </Grid>
    </Grid>
  );
}

export default CommBioDetails;
