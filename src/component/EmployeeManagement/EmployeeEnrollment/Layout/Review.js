import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Review = (data) => {
  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <div className="SummaryMain">
        <label style={{ padding: 5, color: "#1f93ce" }}>Profile</label>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <Item>
              <Typography>
                Name: {data.values.firstName} {data.values.fatherSpouseName}{" "}
                {data.values.lastName}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Gender: {data.values.gender}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
                Date Of Birth:{" "}
                {dayjs(data.values.dateOfBirth).format("DD/MM/YYYY")}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
                Aadhar Card Number: {data.values.aadharNumber}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>Nationality: {data.values.nationality}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
                Education Level: {data.values.educationLevel}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
                Date of Joining:{" "}
                {dayjs(data.values.dateOfJoning).format("DD/MM/YYYY")}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </div>

      <div className="SummaryMain">
        <label style={{ padding: 5, color: "#1f93ce" }}>Bank Details</label>
        <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={6}>
            <Item>
              <Typography>
              Bank Name:
                {data.values.bankName}
              </Typography>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              <Typography>
              Bank Account Number: {data.values.bankAccountNumber}
              </Typography>
            </Item>
          </Grid>
       
          <Grid item xs={6}>
            <Item>
              <Typography>
              IFSC Code: {data.values.ifscCode}
              </Typography>
            </Item>
          </Grid>
      
           <Grid item xs={6}>
            <Item>
              <Typography>
              Pan Number: {data.values.panNumber}
              </Typography>
            </Item>
          </Grid>
        
           <Grid item xs={6}>
            <Item>
              <Typography>
              UAN Number: {data.values.UAN}
              </Typography>
            </Item>
          </Grid>
       
           <Grid item xs={6}>
            <Item>
              <Typography>
              PF Number: {data.values.pfNumber}
              </Typography>
            </Item>
          </Grid>
        
           <Grid item xs={6}>
            <Item>
              <Typography>
              ESICIP: {data.values.esicIP}
              </Typography>
            </Item>
          </Grid>
     
           <Grid item xs={6}>
            <Item>
              <Typography>
              LWF Number: {data.values.lwf}
              </Typography>
            </Item>
          </Grid>
      
        </Grid>
      </div>

      <div className="SummaryMain">
        <label style={{ padding: 5, color: "#1f93ce" }}>Official Details</label>
        <Grid container spacing={2}sx={{ padding: 2 }}>
        <Grid item xs={6}>
            <Item>
              <Typography>
            Site Location: {data.values.siteId1}
              </Typography>
            </Item>
          </Grid>

       
          <Grid item xs={6}>
            <Item>
              <Typography>
              Work Category: {data.values.categoryId1}
              </Typography>
            </Item>
          </Grid>
       
           <Grid item xs={6}>
            <Item>
              <Typography>
              Employee Designation: {data.values.roleId1}
              </Typography>
            </Item>
          </Grid>
         
           <Grid item xs={6}>
            <Item>
              <Typography>
              Service Book Number: {data.values.serviceBookNumber}
              </Typography>
            </Item>
          </Grid>
      
           <Grid item xs={6}>
            <Item>
              <Typography>
              Service Remark: {data.values.serviceRemark}
              </Typography>
            </Item>
          </Grid>
        
        </Grid>
      </div>

      <div className="SummaryMain">
        <label style={{ padding: 5, color: "#1f93ce" }}>Personal Details</label>
        <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={6}>
            <Item>
              <Typography>
              Present Address: {data.values.presentAddress}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
              Permanent Address: {data.values.permanentAddress}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
              Mark Of Identification: {data.values.markOfIdentification}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
              Mobile Nunber: {data.values.mobileNumber}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
              Alternate Mobile Number: {data.values.alternateMobileNumber}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>
              Present Taluka Name: {data.values.cityName}
              </Typography>
            </Item>
          </Grid>
          
        </Grid>
      </div>
    </Box>
  );
};

export default Review;
