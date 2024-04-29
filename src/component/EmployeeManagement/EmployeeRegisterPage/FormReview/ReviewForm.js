import React from 'react';
import { useFormikContext } from 'formik';
import { Typography, Grid } from '@mui/material';
import ProfileDetails from './ProfileDetails';
import BankDetails from './BankDetails';
import WorkDetails from './WorkDetails';
import CommBioDetails from './ContactBioDetails';

export default function ReviewForm() {
    const { values: formValues } = useFormikContext();
    return (
      <>
        <Typography variant="h6">
          Employee summary
        </Typography>
        <Grid container spacing={3} className='SummaryContainer'>
            <ProfileDetails formValues={formValues} />
            <BankDetails formValues={formValues} />
            <WorkDetails formValues={formValues} />
            <CommBioDetails formValues={formValues} />
      </Grid>
      </>
    );
}