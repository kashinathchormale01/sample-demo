import React from 'react';
import { Grid, Typography } from '@mui/material';
import { InputField, SelectField,TextareaField } from '../../../global/FormFields';

const siteLocaionlist = [
    {
      value: '1',
      label: 'Sat Rasta'
    },
    {
      value: '2',
      label: 'Pune Naka'
    },
    {
      value: '3',
      label: 'Navi Peth'
    }
  ];

  const workCategorylist = [
    {
      value: '1',
      label: 'Unskilled'
    },
    {
      value: '2',
      label: 'Skilled'
    },
    {
      value: '3',
      label: 'Semi Skilled'
    },
    {
        value: '4',
        label: 'High Skilled'
    }
  ];

  const designationlist = [
    {
      value: '1',
      label: 'Packer Operator'
    },
    {
      value: '2',
      label: 'Loader'
    },
    {
      value: '3',
      label: 'B.T.'
    }
  ];

export default function EmpWorkForm(props) {
    const {
        formField: {
            siteLocaion,
            categoryWork,
            designation,
            serviceBookNumber,
            serviceRemark
        }
      } = props;
      return (
        <>
          <Typography variant="h6" gutterBottom>Work Form</Typography>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
                <SelectField
                    name={siteLocaion.name}
                    label={siteLocaion.label}
                    data={siteLocaionlist}                    
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectField
                    name={categoryWork.name}
                    label={categoryWork.label}
                    data={workCategorylist}                    
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectField
                    name={designation.name}
                    label={designation.label}
                    data={designationlist}                    
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputField name={serviceBookNumber.name} label={serviceBookNumber.label} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextareaField name={serviceRemark.name} label={serviceRemark.label} fullWidth />
            </Grid>
          </Grid>
        </>
      );
}