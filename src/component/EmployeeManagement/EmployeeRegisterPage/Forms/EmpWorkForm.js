import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from '@mui/material';
import { InputField, SelectField,TextareaField } from '../../../../global/FormFields';
import {workCategoryData, designationData} from '../../../../global/common/StubData/CommonStubData';
import { toast } from "react-toastify";
import axiosHttp from "../../../../AxiosInstance";

export default function EmpWorkForm(props) {  
  const [sitelocations, setSitelocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedsitelocation, setSelectedsitelocation] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
console.log('props',props);
      const siteLocaionlist = sitelocations.map((value) => ({
        value: value.Id,
        label: value.siteName,
      }));

      console.log('siteLocaionlist',siteLocaionlist);

      const designationlist = designations.map((value) => ({
        value: value.Id,
        label: value.RoleName,
      }));

      const categorieslist = categories.map((value) => ({
        value: value.Id,
        label: value.CategoryWork,
      }));
      
      const loadSiteLocation = async () => {      
        try {
          let result = await axiosHttp.get('/GetProj_Site');
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

      const loadCategories = async () => {      
        try {
          let result = await axiosHttp.get('/GetCategory');
          setCategories(result.data.data);          
          setLoading(false);
          // Work with the response...
      } catch (err) {
          if (err.response) {
            setLoading(false);
            setError(err.message);
          } else if (err.request) {
            setLoading(false);
            setError(err.message);
          } else {
              // Anything else
              setLoading(false);
              setError(err.message);
          }
      }
        
      };
      
      const handleSitelocationChange = (value) => {
        const selectedsiteId = siteLocaionlist?.find(item => item.label === value)?.value;
        console.log('site Handle change',selectedsiteId)
        localStorage.setItem('selectedsiteId', JSON.stringify(selectedsiteId));
        setSelectedsitelocation({selectedsiteId});       
      };

      const handleRoleChange = (value) => {
        const selectedroleId = designationlist?.find(item => item.label === value)?.value;
        console.log('Role Handle change',selectedroleId)
        localStorage.setItem('selectedroleId', JSON.stringify(selectedroleId));
        setSelectedsitelocation({selectedroleId});        
      };

      const handleCategoryChange = (value) => {
        const selectedCategoryId = categorieslist?.find(item => item.label === value)?.value;
        console.log('cat Handle change',selectedCategoryId)
        setSelectedCategory({selectedCategoryId}); // Update the state with the selected category
        localStorage.setItem('selectedCategoryId', JSON.stringify(selectedCategoryId));
        // You can perform additional actions here if needed
        axiosHttp.get(`/GetRoleCat/${selectedCategoryId}`)
        .then(res=>{
          console.log(res);
          console.log(res.data);
          setDesignations(res.data.data); 
          toast.success(res.msg);
        }) 
      };
      
         
      useEffect(() => {
        loadSiteLocation();
        loadCategories();
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
                    onChange={handleSitelocationChange}                    
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectField
                    name={categoryWork.name}
                    label={categoryWork.label}
                    data={categorieslist}                      
                    onChange={handleCategoryChange}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <SelectField
                    name={designation.name}
                    label={designation.label}
                    data={designationlist}    
                    onChange={handleRoleChange}               
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