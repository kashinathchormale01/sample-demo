import React, { useEffect, useState } from 'react';
import { Box, Paper,Stack,Typography,CircularProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import axiosHttp from '../../AxiosInstance';
import { useNavigate } from 'react-router-dom';
const CryptoJS = require("crypto-js");

const MyProfile = ({userRole}) => {
  const navigate = useNavigate();
console.log('userRole',userRole)
  const [selectedEmp, setSelectedEmp] = useState();
  const [sitenames, setSitenames] = useState();
  const [empcount, setEmpcount] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const loadSelectedEmployee = async () => {
    try {
      const encryptedId = sessionStorage.getItem("Id");
      if (!encryptedId) {
        console.log("No encrypted ID found in sessionStorage");
       // window.location.href = "/login";
       navigate("/login");
        return;
      } else {
        setLoading(true); 
        const bytes = await CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
        const originalPassword = await bytes.toString(CryptoJS.enc.Utf8);
        const result = await axiosHttp.get(`/GetEmp/${originalPassword}`);
        setSelectedEmp(result.data.data[0]);
        setLoading(false); 
      }
    } catch (err) {
      setLoading(false); 
      console.log("profile", err);
      if (err.response) {
        setError(err.message);
        console.log("profile", error);
      } else if (err.request) {
        setError(err.message);
        console.log("profile", error);
      } else {
        // Anything else
        setError(err.message);
        console.log("profile", error);
      }
    }
  };

  const getSiteAttendance = async () => {      
    try {
      setLoading(true); 
      let result = await axiosHttp.get('/GetSiteEmpList');     
     setSitenames(result.data.data); 
      setLoading(false);    
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

  let plotSiteNames = sitenames?.map((site)=>{
    return site.siteName;
  })

  let plotAtteCount = sitenames?.map((site)=>{
    return site.EmployeeCount;
  })
 
  
  useEffect(() => {
    loadSelectedEmployee(); //eslint-disable-next-line
    getSiteAttendance();
  }, []);  

  if (error) return `Error: ${error.message}`;
  if (!selectedEmp) return <Typography component={"span"} variant={"body2"} color="error">No Data! Please login again!<div className="overlay"><div className="loadingicon">Loading...<CircularProgress /></div></div></Typography>;
  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress /><br/>Loading...</div></div>;

  return (
    <>
      <Box className="wrapper-main">
        <Typography
          variant="h4" component={"span"}
          sx={{
            color: "#808080",
            fontSize: "28px",
            fontWeight: "500",
            marginBottom: "20px",
          }}
        >
          Hello, {selectedEmp.firstName}
        </Typography>

        <Paper sx={{ marginTop: "20px", padding: "10px" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            {" "}
            <Typography component={"span"} variant={"body2"} sx={{ color: "#1f93ce" }}>
              Employee Information summary
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>Designation</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.designation1}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>Site Locaion</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.siteName}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>Present Address</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.presentAddress}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>Permanent Address</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.permanentAddress}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>city Name</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.cityName}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>Mobile</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.mobileNumber}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography component={"span"} variant={"body2"}>Alternate Mobile Number</Typography>
            <Typography component={"span"} variant={"body2"} className="summaryData">
              {selectedEmp.alternateMobileNumber}
            </Typography>
          </Stack>
        </Paper> <br/>  
        { userRole==='Admin' || userRole==='Super'?(  <>   
        {plotSiteNames && plotAtteCount? <Paper>
          <BarChart
          sx={{
    //change left yAxis label styles
   "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
    strokeWidth:"0.4",
    fill:"#1976d2"
   },
   // change all labels fontFamily shown on both xAxis and yAxis
   "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
       fontFamily: "Roboto",
    },
    // change bottom label styles
    "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
        strokeWidth:"0.5",
        fill:"#1976d2"
     },
     
     
  }}
            xAxis={[
              {
                scaleType: "band",
                data: plotSiteNames,
                label: 'Site Locations',
              }                         
            ]}
            yAxis={[{
              label: 'Employee Count',
            }]}
            series={[{ data: plotAtteCount }]}
            width={700}
            height={300}
          />
        </Paper>:'No data available'}</>        
):''}
      </Box>     
    </>
  );
}

export default MyProfile