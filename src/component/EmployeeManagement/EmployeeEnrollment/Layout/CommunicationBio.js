import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import SelectComp from "./../SelectComp";
import axios from "axios";
import { useFormContext, Controller } from "react-hook-form";
import axiosHttp from "../../../../AxiosInstance";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CommunicationBio = (data) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="presentAddress"
              defaultValue={""}
              rules={{
                required: "Present Address is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="presentAddress"
                  label="Present Address"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.presentAddress)}
                  helperText={errors.presentAddress?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="permanentAddress"
              defaultValue={""}
              rules={{
                required: "Permanent Address is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="permanentAddress"
                  label="Permanent Address"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.permanentAddress)}
                  helperText={errors.permanentAddress?.message}
                />
              )}
            />
          </Item>
        </Grid>       
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="cityName"
              defaultValue={""}
              rules={{
                required: "Present Taluka Name is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="TalukaName"
                  label="Present Taluka Name"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.cityName)}
                  helperText={errors.cityName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="markOfIdentification"
              defaultValue={""}
              rules={{
                required: "Mark of Identification is required(eg: moles, birthmarks,etc)",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id="moIdentification"
                  label="Mark of Identification"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.markOfIdentification)}
                  helperText={errors.markOfIdentification?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="mobileNumber"
              defaultValue={""}
              rules={{
                required: "Mobile Number is required",
                minLength:{
                  value:10,
                  message:"Mobile Number is 10 Digits(Format:9876543210) "
                },
                maxLength:{
                  value:10,
                  message:"Mobile Number is 10 Digits(Format:9876543210) "
                },
                pattern:{
                  value: `^[6-9]\d{9}$`,
                  message:"Mobile Number is Invalid (Format:9876543210)"
                },
              }}
              render={({ field }) => (
                <TextField
                type="number"
                  fullWidth
                  id="mobileNumber"
                  label="Mobile Number"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.mobileNumber)}
                  helperText={errors.mobileNumber?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="alternateMobileNumber"
              defaultValue={""}
              rules={{
                required: "Alternate is required if don't have then you can mention Mobile Number",
                minLength:{
                  value:10,
                  message:"Alternate Mobile Number is 10 Digits(Format:9876543210) "
                },
                maxLength:{
                  value:10,
                  message:"Alternate Mobile Number is 10 Digits(Format:9876543210) "
                },
                pattern:{
                  value: `^[6-9]\d{9}$`,
                  message:"Alternate Mobile Number is Invalid (Format:9876543210)"
                },
              }}
              render={({ field }) => (
                <TextField
                type="number"
                  fullWidth
                  id="altmobileNumber"
                  label="Alternate Mobile Number"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.alternateMobileNumber)}
                  helperText={errors.alternateMobileNumber?.message}
                />
              )}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunicationBio;
