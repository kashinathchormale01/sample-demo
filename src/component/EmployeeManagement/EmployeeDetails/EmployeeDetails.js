import React, { useState,useEffect} from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography,Container,CircularProgress } from "@mui/material";
import axiosHttp from "../../../AxiosInstance";
import { useLocation } from "react-router-dom";

const EmployeeDetails = (props) => {
  const [selectedEmp, setSelectedEmp] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {   
      setLoading(true);
      axiosHttp.get(`/GetEmp/${location.state.id.Id}`)
        .then(response => {
          setSelectedEmp(response.data.data[0]);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching data:', error);
        });
    }
  }, [location.state]);

  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  if (error) return <Typography color="error">Something went wrong !</Typography>
  if (!selectedEmp) return <Typography color="error"> No data available for selected employee!</Typography>

  return (
    <>
      <Typography
        component={"span"}
        variant={"body2"}
        sx={{ fontWeight: "600" }}
      >
        Employee Details
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Container maxWidth="md">
            <Paper style={{ padding: "20px", marginTop: "20px" }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  backgroundColor: "#1f93ce",
                  padding: "10pt 0pt 10pt 10pt",
                  color: "#fff",
                }}
              >
                Personal Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item className="details-page-wrapper">
                  <Typography variant="subtitle1">
                    <label>Employee ID:</label> NKS-{selectedEmp?.Id}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Name:</label> {selectedEmp?.firstName}{" "}
                    {selectedEmp?.lastName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Gender:</label> {selectedEmp?.gender}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Date of Birth: </label>
                    {new Date(selectedEmp?.dateOfBirth).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Date of Joining: </label>
                    {new Date(selectedEmp?.dateOfJoning).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Education Level: </label>
                    {selectedEmp?.educationLevel}
                  </Typography>
                  {/* Add more fields as needed */}
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Container maxWidth="md">
            <Paper style={{ padding: "20px", marginTop: "20px" }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  backgroundColor: "#1f93ce",
                  padding: "10pt 0pt 10pt 10pt",
                  color: "#fff",
                }}
              >
                Communication Details
              </Typography>
              <Grid container>
                <Grid item className="details-page-wrapper">
                  <Typography variant="subtitle1">
                    <label>Present Address:</label> {selectedEmp?.presentAddress}
                  </Typography>
                  <Typography variant="subtitle1">
                  <label>Permanent Address:</label> {selectedEmp?.permanentAddress}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>City:</label> {selectedEmp?.cityName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Mobile Number: </label>
                    {selectedEmp?.mobileNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Alternate Mobile Number: </label>
                    {selectedEmp?.alternateMobileNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Mark Of Identification: </label>
                    {selectedEmp?.markOfIdentification}
                  </Typography>
                                    
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Container maxWidth="md">
            <Paper style={{ padding: "20px", marginTop: "20px" }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  backgroundColor: "#1f93ce",
                  padding: "10pt 0pt 10pt 10pt",
                  color: "#fff",
                }}
              >
               Work Details
              </Typography>
              <Grid container>
                <Grid item className="details-page-wrapper">
                  <Typography variant="subtitle1">
                    <label>Work Location:</label> {selectedEmp?.siteName}
                  </Typography>
                  <Typography variant="subtitle1">
                  <label>CategoryWork:</label> {selectedEmp?.categoryWork1}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Designation:</label> {selectedEmp?.designation1}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Mobile Number: </label>
                    {selectedEmp?.mobileNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Service Book Number: </label>
                    {selectedEmp?.serviceBookNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Service Remark: </label>
                    {selectedEmp?.serviceRemark}
                  </Typography>                                    
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeDetails