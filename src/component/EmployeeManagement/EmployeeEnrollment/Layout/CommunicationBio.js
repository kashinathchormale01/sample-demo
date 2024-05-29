import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

import SelectComp from './../SelectComp';
import axios from "axios";
import {
  
  useFormContext,
  Controller,
} from "react-hook-form";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const CommunicationBio = (data) => {
  const { control,formState:{errors} } = useFormContext();
  const [talukaList, setTalukaList] = React.useState([]);

  const talukaListPassValues = {
    sendvalues: talukaList,
    label: "Select Taluka",
    isRequired: "false",
    sentname:"cityName",
    sentdefaultvalue: data.values.cityName
  };


  const getTalukaData = async() => {
   
   await axios.get("/GetTalukaList").then((res) => {
      setTalukaList(
        res.data.data.map((value) => ({
          valueitem: value.TalukaId,
          labelitem: value.TalukaName,
        }))
      );
    });
  };
  React.useEffect(() => {
    getTalukaData();
   
   
  }, []);

  return (
    <Box sx={{ width: '100%', padding:2} }>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <Controller 
            control={control}
            name='presentAddress'
            defaultValue={""}
            rules={{
              required:"First Name is required"
            }}
            render={({field})=>(
              <TextField
             
              fullWidth
              id="presentAddress"
              label="Present Address"
              variant="outlined"
             {...field}
             error={Boolean( errors.presentAddress)}
             helperText={errors.presentAddress?.message}
            />
            
            )}
            />
            </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <Controller 
            control={control}
            name='permanentAddress'
            defaultValue={""}
            rules={{
              required:"First Name is required"
            }}
            render={({field})=>(
              <TextField
             
              fullWidth
              id="permanentAddress"
              label="Permanent Address"
              variant="outlined"
              {...field}
              error={Boolean( errors.permanentAddress)}
              helperText={errors.permanentAddress?.message}
            />
            )}
            />
            </Item>
        </Grid>
        <Grid item xs={6}>
          <Item><SelectComp {...talukaListPassValues}/></Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <Controller 
            control={control}
            name='markOfIdentification'
            defaultValue={""}
          
            render={({field})=>(
              <TextField
             
              fullWidth
              id="moIdentification"
              label="Mark of Identification"
              variant="outlined"
              {...field}
            />
            )}
            />
           </Item>
        </Grid>
        <Grid item xs={6}>
          <Item> 
          <Controller 
            control={control}
            name='mobileNumber'
            defaultValue={""}
            rules={{
              required:"First Name is required"
            }}
            render={({field})=>(
              <TextField
             
              fullWidth
              id="mobileNumber"
              label="Mobile Number"
              variant="outlined"
              {...field}
              error={Boolean( errors.mobileNumber)}
              helperText={errors.mobileNumber?.message}
            />
            )}
            />
           </Item>
        </Grid>
        <Grid item xs={6}>
          <Item> 
          <Controller 
            control={control}
            name='alternateMobileNumber'
            defaultValue={""}
           
            render={({field})=>(
              <TextField
             
              fullWidth
              id="altmobileNumber"
              label="Alternate Mobile Number"
              variant="outlined"
              {...field}
            />
            )}
            />
            </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommunicationBio