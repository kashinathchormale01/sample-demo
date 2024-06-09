import React, { useEffect, useState } from 'react';
import { Box, Paper,Stack,Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import axiosHttp from '../../AxiosInstance';
const CryptoJS = require("crypto-js");

const MyProfile = () => {

  const [selectedEmp, setSelectedEmp] = useState();
  const [error, setError] = useState(null);
  
  const loadSelectedEmployee = async () => {
    try {
      const encryptedId = sessionStorage.getItem("Id");
      if (!encryptedId) {
        console.log("No encrypted ID found in sessionStorage");
        window.location.href = "/login";
        return;
      } else {
        const bytes = await CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
        const originalPassword = await bytes.toString(CryptoJS.enc.Utf8);
        const result = await axiosHttp.get(`/GetEmp/${originalPassword}`);
        setSelectedEmp(result.data.data[0]);
      }
    } catch (err) {
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
  
  useEffect(() => {
    loadSelectedEmployee(); //eslint-disable-next-line
  }, []);  

  if (error) return `Error: ${error.message}`;
  if (!selectedEmp) return "No Data!"

  return (
    <>
      <Box className="wrapper-main">
        <Typography
          variant="h4"
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
            <Typography sx={{ color: "#1f93ce" }}>
              Employee Information summary
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>Designation</Typography>
            <Typography className="summaryData">
              {selectedEmp.designation1}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>Site Locaion</Typography>
            <Typography className="summaryData">
              {selectedEmp.siteName}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>Present Address</Typography>
            <Typography className="summaryData">
              {selectedEmp.presentAddress}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>Permanent Address</Typography>
            <Typography className="summaryData">
              {selectedEmp.permanentAddress}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>city Name</Typography>
            <Typography className="summaryData">
              {selectedEmp.cityName}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>Mobile</Typography>
            <Typography className="summaryData">
              {selectedEmp.mobileNumber}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography>Alternate Mobile Number</Typography>
            <Typography className="summaryData">
              {selectedEmp.alternateMobileNumber}
            </Typography>
          </Stack>
        </Paper>         
        <Paper>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "Jan",
                  "Feb",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            ]}
            series={[{ data: [25, 21, 30, 22, 11, 28, 26, 12, 1, 2, 23, 27] }]}
            width={700}
            height={300}
          />
        </Paper>
      </Box>     
    </>
  );
}

export default MyProfile