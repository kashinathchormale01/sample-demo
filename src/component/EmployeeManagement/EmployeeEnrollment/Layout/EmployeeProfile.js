import React, { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MuiDatePicker from "./../MuiDatePicker";
import Avatar from "@mui/material/Avatar";
import defaultimage from "./../../../../Asset/Images/Deep1.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormContext, Controller } from "react-hook-form";
import CapturePhoto from "./CapturePhoto";
import Resizer from "react-image-file-resizer";



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


const EmployeeProfile = (defaultdates,profileimg, data) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { register, setValue, getValues } = useFormContext();
  const inputRef = React.useRef(null);
  const [age, setAge] = React.useState("");
  const [image, setImage] = React.useState(defaultdates?.img);
  const gender = getgendervalues();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCapture = (imageSrc) => {
    // setCapturedImage(imageSrc);
    setImage(imageSrc);
    register("img", { required: false });
    setValue("img", imageSrc);
  };
//  console.log("datavalues",defaultdates?.img);
//  setImage(window.URL.createObjectURL(defaultdates?.img));
//  const base64String = btoa(String.fromCharCode(...new Uint8Array(defaultdates?.img)));
// function convertimgblob(){
//   console.log('profile image',defaultdates?.img)
//   if(defaultdates.img){
//  // const base64String = btoa(String.fromCharCode(...new Uint8Array(defaultdates?.img)));
//    console.log('profile image in useefffect',defaultdates?.img)
//   setImage(defaultdates?.img);
//   console.log('after profile image in useefffect',image)
//   }
// }

// React.useEffect(()=>{
// convertimgblob()
// },[defaultdates])

 //setImage(URL.createObjectURL(defaultdates?.img))
  const gendepassvalues = {
    sendvalues: gender,
    label: "Gender *",
    isRequired: "false",
    sentname: "gender",
    sentdefaultvalue: "Male",
    // sentdefaultvalue:""
  };
  const dataofbirthpassvalues = {
    sentlabel: "Date of Birth",
    sentyear: -14,
    sentname: "dateOfBirth",
    defaultdate: defaultdates.dob.$d,
  };

  const dateofjoiningpassvalues = {
    sentlabel: "Date of Joining",
    sentyear: 0,
    sentname: "dateOfJoning",
    defaultdate: defaultdates.doj.$d,
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
     const reader = new FileReader();

     reader.onloadend = () => {
      // Resize image using react-image-file-resizer
      Resizer.imageFileResizer(
        file,
        150, // maxWidth
        100, // maxHeight
        'JPEG', // compressFormat
        80, // quality
        0, // rotation
        (uri) => {
          setImage(uri); // Set the resized image URI
          setValue("img", uri); // Set form field value assuming "img" is the field name
        },
        'base64', // outputType
        150, // minWidth (optional)
        100 // minHeight (optional)
      );
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    // reader.addEventListener("load", () => {
    //   const resizeFile = (file) => new Promise(resolve => {
    //     Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
    //     uri => {
    //       resolve(uri);
    //     }, 'base64' );
    // });
    //   setImage(resizeFile);
    //  // console.log('imageinreader',image)
    //   register("img", { required: false });
    //   setValue("img", reader.result);
    // });
  //  reader.readAsDataURL(file);
   // console.log('compresses img',image)
   
  };  

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      

      <div
        onClick={handleImageClick}
        style={{
          width: "9%",
          height: 100,
          flex: "center",
          margin: "auto",
          display: "block",
          textAlign: "center",
        }}
      >
      
   
     <Avatar 
          sx={{
            alignSelf: "center",
            width: "100%",
            height: "100%",
          }}
          variant="rounded"
        >
         <img style={{objectFit:'fill', maxHeight:'100%', maxWidth:'100%'}} src={image} alt="Upload Photo" />
        </Avatar>
      </div>
      <div style={{ margin: "10px" }}>
        <Button
          component="label"
          sx={{ display: "none" }}
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            onChange={handleImageChange}
            ref={inputRef}
            type="file"
            sx={{ display: "none" }}
          />
        </Button>
        <div className="showimg">
        <Button onClick={handleOpenDialog}>Capture Photo</Button>
        {/* {capturedImage && <img src={capturedImage} alt="Profile" />} */}
        {/* {capturedImage &&  <Avatar alt="Profile Image" src={capturedImage} sx={{ width: 100, height: 100, borderRadius:0 }} />}  */}
      <CapturePhoto open={dialogOpen} onClose={handleCloseDialog} onCapture={handleCapture} />
      </div>
        
        
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="firstName"
              defaultValue={""}
              rules={{
                required: "First Name is required be",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ height: 64 }}
                  id="Fname"
                  label="First Name"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="lastName"
              defaultValue={""}
              rules={{
                required: "Last Name is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ height: 64 }}
                  id="Lname"
                  label="Last Name"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="gender"
              defaultValue={""}
              rules={{
                required: "Please select Gender",
              }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    fullWidth
                    label="Gender *"
                    onChange={handleChange}
                    {...field}
                    error={Boolean(errors.gender)}
                    helperText={errors.gender?.message}
                    sx={{textAlign:'left'}}
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
          <Item elevation={0}>
            <MuiDatePicker {...dataofbirthpassvalues} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="aadharNumber"
              defaultValue={""}
              rules={{
                required: "Aadhar Number is required",
                minLength:{
                  value:12,
                  message:"Aadhar Number is 12 Digits(Format:000011112222) "
                },
                maxLength:{
                  value:12,
                  message:"Aadhar Number is 12 Digits(Format:000011112222) "
                },
                pattern:{
                  value: /^[0-9]*$/,
                  message:"Aadhar Number is Invalid (Format:000011112222)"
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ blockSize: 64 }}
                  id="aadharNumber"
                  label="Adhar Number"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.aadharNumber)}
                  helperText={errors.aadharNumber?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="fatherSpouseName"
              defaultValue={""}
              rules={{
                required: "Father / Spouse Name is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ height: 64 }}
                  id="fattherName"
                  label="Father / Spouse Name"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.fatherSpouseName)}
                  helperText={errors.fatherSpouseName?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="nationality"
              defaultValue={"Indian"}
              rules={{
                required: "Nationality is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ height: 64 }}
                  id="Nationality"
                  label="Nationality"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.nationality)}
                  helperText={errors.nationality?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <Controller
              control={control}
              name="educationLevel"
              defaultValue={""}
              rules={{
                required: "Education Level is required",
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ height: 64 }}
                  id="eduLvl"
                  label="Education Level"
                  variant="outlined"
                  {...field}
                  error={Boolean(errors.educationLevel)}
                  helperText={errors.educationLevel?.message}
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item elevation={0}>
            <MuiDatePicker {...dateofjoiningpassvalues} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeProfile;
