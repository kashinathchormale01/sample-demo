import React, { useState,useEffect} from "react";
import axios from "axios"; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography,Container } from "@mui/material";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const EmployeeDetails = (props) => {
  // const { children, value, index, ...other } = props;
  const { id } = useParams();
  const [emplist, setEmplist] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(selectedEmp);

  const loadSelectedEmployee = async () => {      
    try {
      let result = await axios.get(`/GetEmp/1`);
      setSelectedEmp(result?.data?.data[0]);          
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
    loadSelectedEmployee();
  }, []);

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
                    <label>Present Address:</label> {selectedEmp?.siteLocaion}
                  </Typography>
                  <Typography variant="subtitle1">
                  <label>CategoryWork:</label> {selectedEmp?.categoryWork}
                  </Typography>
                  <Typography variant="subtitle1">
                    <label>Designation:</label> {selectedEmp?.designation}
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