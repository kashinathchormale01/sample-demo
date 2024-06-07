import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField,Box,Button,CircularProgress } from '@mui/material'
import { Formik, Form, } from 'formik';
import { toast } from "react-toastify";
import axiosHttp from "../../../AxiosInstance";

const SiteRegisterSchema = yup.object().shape({
  siteName: yup.string().required("required"),
  siteArea: yup.string().required("required"),
  creationDate: yup.date().nullable()
});

const initialValues = {
  siteName: "",
  siteArea: "",
  creationDate: ""
};

const EditSiteLocation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [savedsites, setSavedsites] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const loadSelectedSiteLocation = async() => {
    try {
      let result = await axiosHttp.get(`/GetProj_Site/${id}`);
      setSavedsites(result.data.data[0]);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
        setLoading(false);
        setError(err.message);
      }
    }   
  }
  useEffect(() => {
    loadSelectedSiteLocation();
  }, []);

  const handleFormSubmit = async(values) => {
    try {
      let result = await axiosHttp.put("/UpdateProj_Site", values);
      console.log(result.data.msg);
      toast.success(result.data.msg);
      setLoading(false);
      navigate("/work-location-management");
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
        setLoading(false);
        setError(err.message);
      }
    } 
  }

  if (loading) return <>Loading...<CircularProgress /></>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Formik
        initialValues={savedsites || initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values);
          resetForm();
        }}
        validationSchema={SiteRegisterSchema}
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
                label="Site Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.siteName}
                name="siteName"
                error={Boolean(touched.siteName) && Boolean(errors.siteName)}
                helperText={touched.siteName && errors.siteName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Site Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.siteArea}
                name="siteArea"
                error={Boolean(touched.siteArea) && Boolean(errors.siteArea)}
                helperText={touched.siteArea && errors.siteArea}
                sx={{ gridColumn: "span 2" }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Creation Date"
                  disableFuture
                  value={values.creationDate}
                  slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                  error={
                    Boolean(touched.creationDate) &&
                    Boolean(errors.creationDate)
                  }
                  helperText={touched.creationDate && errors.creationDate}
                  sx={{ gridColumn: "span 4" }}
                />
              </LocalizationProvider>
            </Box>
            {/* BUTTONS */}
            <Box sx={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained" color="primary">
                Update Site Location
              </Button>
              <Button sx={{marginLeft:'10px'}} variant="outlined" color="secondary" onClick={() => navigate(-1)}>Back</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditSiteLocation