import React, { useState, useEffect } from "react";
import axios from "axios"; 
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { TextField,Box,Button } from '@mui/material'
import { Formik, Form, } from 'formik';
import { toast } from "react-toastify";

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

  function loadSelectedSiteLocation() {
    axios
      .get(`http://192.168.1.121:8089/api/GetProj_Site/${id}`)
      .then((res) => {
        console.log(res);
        console.log(JSON.stringify(res.data.data[0]));
        setSavedsites(res.data.data[0]);
      });
    // console.log('savedSiteDataonload',savedSiteData);
  }
  useEffect(() => {
    loadSelectedSiteLocation();
  }, []);

  function handleFormSubmit(values) {
    // fetch("http://192.168.1.121:8089/api/SaveProj_Site", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values),
    //     });

    axios
      .put("http://192.168.1.121:8089/api/UpdateProj_Site", values)
      .then((res) => {
       // console.log(res);
        console.log(res.data.msg);
        toast.success(res.data.msg);
      });

    navigate("/work-location-management");
  }

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
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditSiteLocation