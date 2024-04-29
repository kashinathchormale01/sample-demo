import React from 'react';
import { Typography, Grid } from '@mui/material';

function WorkDetails(props) {
  const { formValues } = props;
//   const classes = useStyles();
  const { siteLocaion,
    categoryWork,
    designation,
    serviceBookNumber,
    serviceRemark } = formValues;
  return (
    <Grid item xs={12} sm={12}>   
      <Grid item xs={12} sm={12} className='SummaryMain'>
      <Typography variant="h6" gutterBottom sx={{textAlign:'center',color:'#1f93ce'}}>
        Work Details
      </Typography>
        <Typography gutterBottom>
          <label>Site Locaion: </label>
          {`${siteLocaion}`}
        </Typography>
        <Typography gutterBottom>
          <label>Work Category: </label>
          {`${categoryWork}`}
        </Typography>
        <Typography gutterBottom>
          <label>designation: </label>
          {`${designation}`}
        </Typography>
        <Typography gutterBottom>
          <label>Service Book Number: </label>
          {`${serviceBookNumber}`}
        </Typography>
        <Typography gutterBottom>
          <label>Service Remark: </label>
          {`${serviceRemark}`}
        </Typography>       
      </Grid>
    </Grid>
  );
}

export default WorkDetails;
