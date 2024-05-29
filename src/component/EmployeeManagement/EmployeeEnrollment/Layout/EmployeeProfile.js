import TextField from "@mui/material/TextField";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SelectComp from "./../SelectComp";
import MuiDatePicker from "./../MuiDatePicker";
import Avatar from '@mui/material/Avatar';
import defaultimage from './../../../../Asset/Images/Deep1.jpg'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  
  useFormContext,
  Controller,
} from "react-hook-form";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function getgendervalues(data) {
  return [
    { valueitem: "Male", labelitem: "Male" },
    { valueitem: "Female", labelitem: "Female" },
    { valueitem: "Other", labelitem: "Other" },
  ];
  
}

const EmployeeProfile = (defaultdates,data) => {
  
  const { control,formState:{errors} } = useFormContext();
  const { register ,setValue} = useFormContext();
const inputRef=React.useRef(null);
const [age, setAge] = React.useState('');

 

//console.log("emp profiledata",defaultdates);
const [image,setImage]=React.useState("");
  const gender = getgendervalues();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  
  register("img",{required:false});
  setValue("img",defaultimage);

  const gendepassvalues = {
  
    sendvalues: gender,
    label: "Gender *",
    isRequired: "false",
    sentname:"gender",
    sentdefaultvalue:"Male"
   // sentdefaultvalue:""
  };
  const dataofbirthpassvalues = {
    sentlabel: "Date of Birth",
    sentyear: -14,
    sentname:"dateOfBirth",
    defaultdate:defaultdates.dob.$d
  };

  const dateofjoiningpassvalues = {
    sentlabel: "Date of Joining",
    sentyear: 0,
    sentname:"dateOfJoning",
    defaultdate:defaultdates.doj.$d
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleImageClick= () =>{
    inputRef.current.click();
  }
 // console.log("this is first one",inputRef.current);

  const handleImageChange=async(event)=>{
    const file=event.target.files[0];
    
// setImage(URL.createObjectURL(file));


const reader = new FileReader();
reader.addEventListener('load',()=>{
  setImage(reader.result)
})
reader.readAsDataURL(file)

//console.log(image)

register("img",{required:false});
setValue("img",image);
  }

  return (
    <Box sx={{ width: "100%", padding: 2}}>
      <div onClick={handleImageClick} style={{backgroundColor:"yellow", width:"9%",height:100 ,flex:"center",margin:"auto",display:"block",textAlign:"center"}}>
      
      <Avatar    sx={{ bgcolor: "red" ,alignSelf:"center" ,width:"100%",height:"100%",objectFit:"cover"}}  variant="rounded" >
      {image ?  <img src={ image} alt="" height="100%" width="100%" /> : <img src={defaultimage} alt="" height="100%" width="100%" /> }
      </Avatar>
      </div>
      <div style={{margin:"10px"}}>
      <Button
      component="label"
      sx={{display:"none"}}
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput onChange={handleImageChange} ref={inputRef} type="file" sx={{display:"none"}} />
    </Button>
      
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        
        <Grid item xs={6}>
          <Item>
            <Controller
              control={control}
              name="firstName"
              defaultValue={""}
              
              rules={{
                
                 required:"First Name is required be"
              }}
              render={({ field }) => (
                <TextField
                  
                  fullWidth
                  sx={{height:64}}
                  id="Fname"
                  label="First Name"
                  variant="outlined"

                  {...field}
                  
                 error={Boolean( errors.firstName)}
                 helperText={errors.firstName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Controller
              control={control}
              name="lastName"
            
              defaultValue={""}
              rules={{
                required:"Last Name is required"
              }}
              
              render={({ field }) => (
                <TextField
               
                  fullWidth
                  sx={{height:64}}
                  id="Lname"
                  label="Last Name"
                  variant="outlined"
                  {...field}
                  error={Boolean( errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          {/* <Item>{SelectComp(gender,"Gender",false)}</Item> */}
          <Item>
            {/* <SelectComp  {...gendepassvalues} /> */}

<Controller    
control={control}
name="gender"
defaultValue={""}
render={({field})=>(

  <FormControl sx={{}} fullWidth>
  <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
  <Select
    labelId="demo-simple-select-helper-label"
    id="demo-simple-select-helper"
    value={age}
    fullWidth
    
    label="Gender *"
    onChange={handleChange}
    {...field}
  >
   
    <MenuItem value={"Male"}>Male</MenuItem>
    <MenuItem value={"Female"}>Female</MenuItem>
    <MenuItem value={"Other"}>Other</MenuItem>
  </Select>
  {/* <FormHelperText>With label + helper text</FormHelperText> */}
</FormControl>


)}


/>
           

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <MuiDatePicker {...dataofbirthpassvalues}/>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Controller
              control={control}
              name="aadharNumber"
              defaultValue={""}
              rules={{
                required:"Aadhar Number is required"
              }}
              render={({ field }) => (
                <TextField
                 
                  fullWidth
                  sx={{blockSize:64}}

                  id="aadharNumber"
                  label="Adhar Number"
                  variant="outlined"
                  {...field}
                  error={Boolean( errors.addharnumber)}
                  helperText={errors.addharnumber?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Controller
              control={control}
              name="fatherSpouseName"
              defaultValue={""}
              rules={{
                required:"Father / Spouse Name is required"
              }}
              render={({ field }) => (
                <TextField
                
                  fullWidth
                 
                  sx={{height:64}}
                  id="fattherName"
                  label="Father / Spouse Name"
                  variant="outlined"
                  {...field}
                  error={Boolean( errors.fatherSpouseName)}
                  helperText={errors.fatherSpouseName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <Controller
              control={control}
              name="nationality"
              defaultValue={""}
              rules={{
                required:"Nationality is required"
              }}
              render={({ field }) => (
                <TextField
               
                fullWidth
                sx={{height:64}}
                id="Nationality"
                label="Nationality"
                variant="outlined"
                {...field}
                error={Boolean( errors.nationality)}
                helperText={errors.nationality?.message}
              />
              )}
            />
           
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <Controller
              control={control}
              name="educationLevel"
              defaultValue={""}
              render={({ field }) => (
                <TextField
              
                fullWidth
                sx={{height:64}}
                id="eduLvl"
                label="Education Level"
                variant="outlined"
                {...field}
             
              />
              )}
            />
           
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <MuiDatePicker {...dateofjoiningpassvalues} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeProfile;
