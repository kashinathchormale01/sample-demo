import React from 'react';
import { Typography, Grid } from '@mui/material';

function BankDetails(props) {
  const { formValues } = props;
//   const classes = useStyles();
  const { banktName,
    bankAccountNumber, 
    ifscCode,
    panNumber,
    uan,
    pfNumber, 
    esicIP,  
    lwf } = formValues;
  return (
    <Grid item xs={12} sm={12}>   
      <Grid item xs={12} sm={12} className='SummaryMain'>
      <Typography variant="h6" gutterBottom sx={{textAlign:'center',color:'#1f93ce'}}>
        Bank Details
      </Typography>
        <Typography gutterBottom>
          <label>Bank Name: </label>
          {`${banktName}`}
        </Typography>
        <Typography gutterBottom>
          <label>BANK Account Number: </label>
          {`${bankAccountNumber}`}
        </Typography>
        <Typography gutterBottom>
          <label>IFSC Code: </label>
          {`${ifscCode}`}
        </Typography>
        <Typography gutterBottom>
          <label>PAN Number: </label>
          {`${panNumber}`}
        </Typography>
        <Typography gutterBottom>
          <label>UAN: </label>
          {`${uan}`}
        </Typography>
        <Typography gutterBottom>
          <label>PF Number: </label>
          {`${pfNumber}`}
        </Typography>
        <Typography gutterBottom>
          <label>ESIC-IP:</label> {`${esicIP}`}
        </Typography>
        <Typography gutterBottom>
          <label>LWF: </label>
          {`${lwf}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default BankDetails;
