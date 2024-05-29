import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
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

const BankDetail = () => {
  const { control,formState:{errors} } = useFormContext();
  return (
    <Box sx={{ width: '100%' ,padding:2}}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Item>    
          <Controller 
          control={control}
          name='bankName'
          defaultValue={""}
          rules={{
            required:"Bank Name is required"
          }}
          render={({field})=>(
            <TextField
         
            fullWidth
            id="BName"
            label="BankName"
            variant="outlined"
            {...field}
            error={Boolean( errors.banktName)}
            helperText={errors.banktName?.message}
          />
          )}
          />      
           </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>    
        <Controller 
          control={control}
          name='bankAccountNumber'
          defaultValue={""}
          rules={{
            required:"Bank Account Number is required"
          }}
          render={({field})=>(
            <TextField
           
            fullWidth
            id="BankAccount"
            label="Bank Account Number"
            variant="outlined"
            {...field}
            error={Boolean( errors.bankAccountNumber)}
            helperText={errors.bankAccountNumber?.message}
          />
          )}
          />
          </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>      
        <Controller 
          control={control}
          name='ifscCode'
          defaultValue={""}
          rules={{
            required:"IFSC Code is required"
          }}
          render={({field})=>(
            <TextField
           
            fullWidth
            id="IFSCCode"
            label="IFSC Code"
            variant="outlined"
            {...field}
            error={Boolean( errors.ifscCode)}
            helperText={errors.ifscCode?.message}
          />
          )}
          />   
           </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>  
        <Controller 
          control={control}
          name='panNumber'
          defaultValue={""}
          rules={{
            required:"Pan Card No is required",
            pattern:{
              value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
              message:"for example ( AAAAA9999A)"
            },
          }}
          render={({field})=>(
            <TextField
            
            fullWidth
            id="PanNumber"
            label="Pan Number"
            variant="outlined"
            {...field}
            error={Boolean(errors.panNumber)}
            helperText={errors.panNumber?.message}
          />
          )}
          />           
            </Item>
      </Grid>
      <Grid item xs={6}>
        <Item> 
        <Controller 
          control={control}
          name='UAN'
          defaultValue={""}
          rules={{
            required:"UAN Number is required",
            minLength:{
              value:12,
              message:"UAN Number is 12 Digits(Format:000011112222) "
            },
            maxLength:{
              value:12,
              message:"UAN Number is 12 Digits(Format:000011112222) "
            },
            pattern:{
              value: /^[0-9]+$/,
              message:"UAN Number is Invalued (Format:000011112222)"
            },
          }}
          render={({field})=>(
            <TextField
           
            fullWidth
            id="UanNumber"
            label="UAN Number"
            variant="outlined"
            rules={{
              required:"Bank Name is required"
            }}
            {...field}
            error={Boolean(errors.uan)}
            helperText={errors.uan?.message}
          />
          )}
          />            
           </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>   
        <Controller 
          control={control}
          name='pfNumber'
          defaultValue={""}
          rules={{
            required:"PF Number is Required"
          }}
          render={({field})=>(
            <TextField
          
            fullWidth
            id="PFNumber"
            label="PF Number"
            variant="outlined"
            {...field}
            error={Boolean( errors.pfNumber)}
            helperText={errors.pfNumber?.message}
          />
          )}
          />        
            </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>    
        <Controller 
          control={control}
          name='esicIP'
          defaultValue={""}
          rules={{
            required:"esic IP Number is required"
          }}
          render={({field})=>(
            <TextField
             
              fullWidth
              id="EsicIpNumber"
              label="esic IP Number"
              variant="outlined"
              {...field}
              error={Boolean( errors.esicIP)}
              helperText={errors.esicIP?.message}
            />
          )}
          />        
           </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>      
        <Controller 
          control={control}
          name='lwf'
          defaultValue={""}
          render={({field})=>(
            <TextField
           
            fullWidth
            id="LabourFund"
            label="Labour Welfair Fund Name"
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

export default BankDetail