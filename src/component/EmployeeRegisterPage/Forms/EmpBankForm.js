import React from 'react';
import { Grid, Typography } from '@mui/material';
import { InputField } from '../../../global/FormFields';


export default function EmpBankForm(props) {
    const {
        formField: {
          banktName,
          bankAccountNumber, 
          ifscCode,
          panNumber,
          uan,
          pfNumber, 
          esicIP,  
          lwf,
        }
      } = props;
      return (
        <>
          <Typography variant="h6" gutterBottom>Bank Form</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <InputField name={banktName.name} label={banktName.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={bankAccountNumber.name} label={bankAccountNumber.label} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputField name={ifscCode.name} label={ifscCode.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={panNumber.name} label={panNumber.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={uan.name} label={uan.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={pfNumber.name} label={pfNumber.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={esicIP.name} label={esicIP.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={lwf.name} label={lwf.label} fullWidth />
            </Grid>
          </Grid>
        </>
      );
}