import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { InputField, SelectField, DatePickerField, TextareaField } from '../../global/FormFields';
import EmployeeList from '../EmployeeList/EmployeeList';

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

  const nationalitylist = [
    {
      value: '0',
      label: 'India'
    },
    {
        value: '1',
        label: 'USA'
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

export default function EmpExitForm(props) {
    // const [countryName, setCountryName] = React.useState("India");
    // const {
    //     formField: {
    //         empSelect,
    //         empDOJ,
    //         empServiceBookNumber,
    //         empDesignation,
    //         dateOfExit,
    //         exitRemark,
    //     }
    //   } = props;
      return (
        // <React.Fragment>
        //     <Grid mt={0} mb={2} container spacing={3}>
        //     <Grid item xs={12} sm={6}>
        //         <InputField name={empServiceBookNumber} label={empServiceBookNumber} value={empServiceBookNumber} fullWidth />
        //     </Grid>
        //     <Grid item xs={12} sm={6}>
        //         <InputField name={empDesignation} label={empDesignation} value={empDesignation} fullWidth />
        //     </Grid>
        //     <Grid item xs={12} sm={6}>
        //         <InputField name={dateOfExit} label={dateOfExit} fullWidth />
        //     </Grid>
        //     <Grid item xs={12} sm={6}>
        //         <TextareaField name={exitRemark} label={exitRemark} value={exitRemark} fullWidth />
        //     </Grid>
        //     </Grid>
        //   </React.Fragment>
        <>Employee Exit Page coming soon</>
      );
}