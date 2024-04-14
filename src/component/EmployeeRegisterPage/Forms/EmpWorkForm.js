import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from '@mui/material';
import { InputField, SelectField,TextareaField } from '../../../global/FormFields';
import {workCategoryData, designationData} from '../../../global/common/StubData/CommonStubData';

export default function EmpWorkForm(props) {
  const [workCategorylist, setWorkCategorylist] = React.useState(workCategoryData);
  const [designationlist, setDesignationlist] = React.useState(designationData);
  const [sitelocations, setSitelocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const {
        formField: {
            siteLocaion,
            categoryWork,
            designation,
            serviceBookNumber,
            serviceRemark
        }
      } = props;

      const siteLocaionlist = sitelocations.map((value) => ({
        value: value.id,
        label: value.siteName,
      }));

      const loadSiteLocation = async () => {      
        try {
          let result = await axios.get('/GetProj_Site');
          setSitelocations(result.data.data);          
          setLoading(false);
          // Work with the response...
      } catch (err) {
          if (err.response) {
            setLoading(false);
            console.log('Status', err.response.status);
            setError(err.message);
              // The client was given an error response (5xx, 4xx)
              console.log('Error response', err.message);
          } else if (err.request) {
            setLoading(false);
            setError(err.message);
              // The client never received a response, and the request was never left
              console.log('Error Request', err.message);
          } else {
              // Anything else
              setLoading(false);
              setError(err.message);
              console.log('Error anything', err.message);
          }
      }
        
      };
    
      useEffect(() => {
        loadSiteLocation();
      }, []);

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