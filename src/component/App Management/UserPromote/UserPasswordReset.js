import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography,Container,Paper, Grid, Button,Chip } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const UserPasswordReset = () => {
  const [selectedadminemp, setSelectedadminemp] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedadminemp(location.state.id);
  }, [location]);

  //console.log({location });
  console.log(selectedadminemp);


  const handlereset = async()=>{
    let userResetPayload = {};
    userResetPayload = {
      empid:selectedadminemp.empid
    }
    console.log(userResetPayload)
    try {
      setLoading(true); // Set loading before sending API request
      const res = await axios.post("/PramoteUser1", userResetPayload);
      const response = res; // Response received
      toast.success(res.data.msg);
      setLoading(false); // Stop loading
      navigate('/access-management');
    } catch (err) {
      setLoading(false); // Stop loading in case of error
      console.error(error);
    } 
  }

  return (
    <>
    <Typography
      component={"span"}
      variant={"body2"}
      sx={{ fontWeight: "600" }}
    >
      Password Reset
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
              Selected Employee Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item className="details-page-wrapper">
               
                <Typography variant="subtitle1">
                  <label>Name Of Employee:</label> {selectedadminemp.firstName}{" "}
                  {selectedadminemp?.fatherSpouseName}{" "}
                  {selectedadminemp?.lastName}
                </Typography>
                <Typography variant="subtitle1">
                  <label>Emp_ID:</label> {selectedadminemp.empid}
                </Typography>
                <Typography variant="subtitle1">
                  <label>User_Name:</label> {selectedadminemp.userName}
                </Typography>
                <Typography variant="subtitle1">
                  <label>Site Location: </label>
                  {/* {selectedadminemp.SiteId} */}
                  {selectedadminemp.SiteId?.split(",").map((location, index) => (
                      <Chip key={index} label={location.trim()} color='success' variant="outlined" sx={{ marginRight: "5px" }} />
                    ))}
                </Typography>
                
                <Button
              className="buttonMain"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handlereset}
            >
              Reset Password
            </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Grid>
      </Grid>
      </>
  )
}

export default UserPasswordReset;
