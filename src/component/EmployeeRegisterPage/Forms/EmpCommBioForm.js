import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { InputField, SelectField, TextareaField } from '../../../global/FormFields';

const genderlist = [
    {
      value: '1',
      label: 'Male'
    },
    {
      value: '2',
      label: 'Female'
    },
    {
      value: '3',
      label: 'Other'
    }
  ];

  const cityNamelist = [
    {
      value: '0',
      label: 'Solapur'
    },
    {
        value: '1',
        label: 'Kolhapur'
    }
  ];

  const educationLevellist = [
    {
        value: undefined,
        label: 'None'
    },
    {
      value: '1',
      label: 'BA'
    },
    {
        value: '2',
        label: 'BCOM'
    },
    {
        value: '3',
        label: 'HSC'
    }
  ];

export default function EmpCommBioForm(props) {
    // const [countryName, setCountryName] = React.useState("India");
    const {
      formField: {
        presentAddress,
        permanentAddress,
        cityName,
        markOfIdentification,
        mobileNumber,
        alternateMobileNumber,
      },
    } = props;
      return (
        <React.Fragment>
          <Typography mt={4} variant="h6" gutterBottom>Profile Form</Typography>
          <Grid mb={2} container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextareaField name={presentAddress.name} label={presentAddress.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextareaField name={permanentAddress.name} label={permanentAddress.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectField
                    name={cityName.name}
                    label={cityName.label}
                    data={cityNamelist}                    
                    fullWidth
                />
            </Grid>           
            <Grid item xs={12} md={6}>
                <InputField name={markOfIdentification.name} label={markOfIdentification.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={mobileNumber.name} label={mobileNumber.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={alternateMobileNumber.name} label={alternateMobileNumber.label} fullWidth />
            </Grid>            
          </Grid>
          </React.Fragment>
      );
}