import React, { useEffect, useState } from 'react'
import axios from "axios"; 
import * as yup from "yup";
import { TextField,Box,Button,CircularProgress } from '@mui/material'
import { Formik, Form, } from 'formik';
import { useNavigate} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { toast } from "react-toastify";


const DesignationRegisterSchema = yup.object().shape({
    CatagoryId: yup.string().required("required"),
    RoleName: yup.string().required("required"),
  });

  const initialValues = {
    CatagoryId:"",
    RoleName: "",
  };

const AddDesignation = () => {

    const navigate = useNavigate();
    const[categorylist, setCategorylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [age, setAge] = React.useState('');

    const loadCategories = async () => {      
        try {
          let result = await axios.get('/GetCategory');
          setCategorylist(result.data.data);          
          setLoading(false);
          // Work with the response...
      } catch (err) {
          if (err.response) {
            setLoading(false);
           // console.log('Status', err.response.status);
            setError(err.message);
              // The client was given an error response (5xx, 4xx)
              //console.log('Error response', err.message);
          } else if (err.request) {
            setLoading(false);
            setError(err.message);
              // The client never received a response, and the request was never left
             // console.log('Error Request', err.message);
          } else {
              // Anything else
              setLoading(false);
              setError(err.message);
            // console.log('Error anything', err.message);
          }
      }
        
      };

      useEffect(() => {
        loadCategories();
      }, []);      

    function handleFormSubmit (values){
        axios.post('/AddRole', values)
          .then(res=>{
            toast.success(res.data.msg);  
          })      
          navigate('/designation-management');
      };

      if (loading) return <>Loading...<CircularProgress /></>;
      if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          resetForm();
        }}
        validationSchema={DesignationRegisterSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >

        <TextField
              select
              id="CatagoryId"
              label="Select Employee Category"
              defaultValue = ""
              value={values.CatagoryId}
              onChange={handleChange('CatagoryId')}
              helperText={touched.CatagoryId ? errors.CatagoryId : ''}
              error={touched.CatagoryId && Boolean(errors.CatagoryId)}
              variant="outlined"
              fullWidth
            >
              {categorylist.map(option => (
                <MenuItem key={option.Id} value={option.Id}>
                  {option.CategoryWork}
                </MenuItem>
              ))}
            </TextField>     

              <TextField
                label="Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.RoleName}
                name="RoleName"
                error={Boolean(touched.RoleName) && Boolean(errors.RoleName)}
                helperText={touched.RoleName && errors.RoleName}
                sx={{ width:'300px' }}
              />
              
             
            </Box>
            {/* BUTTONS */}
            <Box sx={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained" color="primary" startIcon={<ManageAccountsIcon />}>
                Add Role
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddDesignation