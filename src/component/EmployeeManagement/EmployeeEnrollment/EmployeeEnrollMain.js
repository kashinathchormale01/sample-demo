import React, { useState, useEffect } from "react";
import FormPageLayout from './Layout/FormLayoutWrapper';
import EmployeeEnroll from './EmployeeRegister';
import axiosHttp from "../../../AxiosInstance";
import { useNavigate } from "react-router-dom";
import { Typography, Button,CircularProgress } from "@mui/material";

const EmployeeEnrollMain = () => {
  const navigate = useNavigate();
  const [designationlist, setDesignationlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadDesignations = async () => {
    try {
      setLoading(true);
      let result = await axiosHttp.get("/GetRole");
      setDesignationlist(result.data.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
        console.log("Error response", err.message);
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

  useEffect(() => {
    loadDesignations();
  }, []);

  if (loading) return <div className="overlay"><div className="loadingicon">Loading...<CircularProgress /></div></div>;
  
  if (!designationlist == null || !designationlist.length)
    return (
      <>       
        <Typography color="error">No Designation available!, Please add the Designation/Role to Enroll the Employee</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-designation")}
        >
          Add New Designation/Role
        </Button>{" "}
        <Typography color="error">No Site available!, Please add the Designation/Role to Enroll the Employee</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-site-location")}
        >
          Add New Designation/Role
        </Button>{" "}
      </>
    );
   

  return (
    <FormPageLayout>
        <EmployeeEnroll />
    </FormPageLayout>
  )
}

export default EmployeeEnrollMain