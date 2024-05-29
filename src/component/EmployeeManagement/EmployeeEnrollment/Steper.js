import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import EmployeeProfile from "./Layout/EmployeeProfile";
import BankDetails from "./Layout/BankDetail";
import WorkDetails from "./Layout/WorkDetails";
import CommunicationBio from "./Layout/CommunicationBio";
import Review from "./Layout/Review";
import axios from "axios";
import dayjs from 'dayjs';
import {
  useForm,
  FormProvider,

} from "react-hook-form";





function getSteps() {
  return [
    "Profile",
    "Bank Details",
    "Work Details",
    "Communication and Bio Details",
    "Review Details",
  ];
}

let values={};


const Steper = (selectedid) => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [lastMessage, setLastMessage] = useState("Pending");
  const [savelabel, setSavelabel] = useState("Finish");
//console.log("First load",selectedid.sentid.Id);
  const [defaultdates, setDefaultdates] = useState({
    dob:dayjs(selectedid.sentid.dateOfBirth),
    doj:dayjs(selectedid.sentid.dateOfJoning),
  });

  const steps = getSteps();
  const methods = useForm();

 
  // const defaultdates={
  //   dob:dayjs('01/01/2010'),
  //   doj:dayjs('01/01/2024'),
  // }

  const predefincevalues=()=>{
    // console.log("valueinitiated as :",selectedid.sentid);
     if(selectedid.sentid.Id==="-1")
       {
       console.log("defailvalue :",selectedid.sentid.Id);
       setSavelabel("Finish");
     }
 else
 {
   
 setSavelabel("Update");
 console.log('date in stepp',selectedid.sentid.Id)
 axios
 .get(`/GetEmp/${selectedid.sentid.Id}`)
 .then((res) => {
   //console.log(res?.data.data);
   //   if (res.msg === "Data Milala Ka") {
   
   let responsedata=res.data.data[0];
  // console.log("SentValue :",dayjs( responsedata.dateOfBirth).format("DD/MM/YYYY"),"and values are",values);
  // console.log("double click emp datat1",res.data.data[0]);
methods.register("Id", { required: false });
methods.setValue("Id", selectedid.sentid.Id);
   methods.setValue("firstName",responsedata.firstName);
   methods.setValue("lastName",responsedata.lastName);
   methods.setValue("fatherSpouseName",responsedata.fatherSpouseName);
   methods.setValue("aadharNumber",responsedata.aadharNumber);
  
   methods.setValue("gender",responsedata.gender);
   methods.setValue("nationality",responsedata.nationality);
   methods.setValue("educationLevel",responsedata.educationLevel);
   methods.setValue("dateOfBirth",dayjs( responsedata.dateOfBirth).format("YYYY/MM/DD"));
  //  defaultdates.dob = dayjs( responsedata.dateOfBirth).format("YYYY/MM/DD");
  // setDefaultdates({
  //   dob:dayjs( responsedata.dateOfBirth).format("YYYY/MM/DD"),
  //   doj:dayjs( responsedata.dateOfJoning).format("YYYY/MM/DD"),
  // })
 
   methods.setValue("bankName",responsedata.bankName);
   methods.setValue("bankAccountNumber",responsedata.bankAccountNumber);
   methods.setValue("ifscCode",responsedata.ifscCode);
   methods.setValue("panNumber",responsedata.panNumber);
   methods.setValue("UAN",responsedata.UAN);
   methods.setValue("pfNumber",responsedata.pfNumber);
   methods.setValue("esicIP",responsedata.esicIP);
   methods.setValue("lwf",responsedata.lwf);
  
   methods.setValue("siteId",responsedata.siteLocaion);
   methods.setValue("categoryId",responsedata.categoryWork);
   methods.setValue("roleId",responsedata.designation);
   methods.setValue("roleId1",responsedata.designation1);
   methods.setValue("serviceBookNumber",responsedata.serviceBookNumber);
   methods.setValue("serviceRemark",responsedata.serviceRemark);
  
   methods.setValue("presentAddress",responsedata.presentAddress);
   methods.setValue("permanentAddress",responsedata.permanentAddress);
   methods.setValue("cityName",responsedata.cityName);
   methods.setValue("cityName1",responsedata.TalukaName);
   methods.setValue("markOfIdentification",responsedata.markOfIdentification);
   methods.setValue("mobileNumber",responsedata.mobileNumber);
   methods.setValue("alternateMobileNumber",responsedata.alternateMobileNumber);
 
 
 
 
   //console.log("represent",data);
   //   }
 })
 .catch((error) => {
   console.log(error);
 });
 
 
 // methods.setValue("firstName","lalala");
 // methods.setValue("lastName","gagaga");
 // register("firstname");
 // setValue("firstname","lalalala");
 
 }
   }
 

  function getActiveStepContent(steps) {
    switch (steps) {
      case 0:
        return <EmployeeProfile {...defaultdates} {...values} />;
  
      case 1:
        return <BankDetails {...values} />;
  
      case 2:
        return <WorkDetails {...values} />;
  
      case 3:
        return <CommunicationBio {...values}/>;
  
      case 4:
        return <Review {...values}/>;
  
      default:
        break;
    }
  }

  


  React.useEffect(()=>{
    predefincevalues();
  },[])
  const isStepFailed=()=>{
    return Boolean(Object.keys(methods.formState.errors).length);
  }
  const handleNext = (data) => {
    isStepFailed();
    values={values:data};
    console.log(values);
    if(activeStep===steps.length-1&&savelabel==="Finish")
      {
       console.log(values);
       axios
       .post("/SaveEmp", values)
       .then((res) => {
        console.log(res);
         if(res.data.msg==="Succesfull")
         {
         console.log("success");
         setLastMessage("Employe Saved Successfully");
 
        //  sessionStorage.setItem("token",res.data.Key);
 
          //navigate("/Afterlogin");
         }
         else
         {
           alert(res.data.msg);
           setLastMessage("Employe Can not be Saved");
           console.log("Session Invalid");
         }
       })
       .catch((error) => {
         console.log(error);
         setLastMessage("Technical Error please contact Administrator");
       });
      }
      if(activeStep===steps.length-1&&savelabel==="Update")
        {
          alert("This is Triggered");
          console.log("update values",values);
          axios
          .put("/UpdateEmp", values)
          .then((res) => {
           console.log(res);
            if(res.data.msg==="Succesfull")
            {
            console.log("success");
            setLastMessage("Employe Updated Successfully");
    
           //  sessionStorage.setItem("token",res.data.Key);
    
             //navigate("/Afterlogin");
            }
            else
            {
              alert(res.data.msg);
              setLastMessage("Employe Can not be Updated");
              console.log("Session Invalid");
            }
          })
          .catch((error) => {
            console.log(error);
            setLastMessage("Technical Error please contact Administrator");
          });
        }
    setActiveStep(activeStep + 1); 
  }
  
  const handleBack = () => {
    if(activeStep === steps.length - 1)
    setActiveStep(0);
  else
    setActiveStep(activeStep - 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep}>
      
        {steps.map((steps, index) => {
          const labelProps={};
          if(isStepFailed()&& activeStep===index)
          {
            labelProps.error=true;
          }
          return (
            <Step key={index}>
              <StepLabel  {...labelProps}>{steps}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          {lastMessage}
        </Typography>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              backgroundColor: "green",
              margin: "10",
              display: "block",
            }}
          >
            <FormProvider {...methods}>
              <form
                // onSubmit={methods.handleSubmit(handleNext)}
                onSubmit={methods.handleSubmit(handleNext)}
                style={{ alignContent: "center" }}
              >
                {getActiveStepContent(activeStep)}

                <div style={{ flexDirection: "row", flexFlow: "row" }}>
            <div style={{ backgroundColor: "red" }}>
              <Button
                sx={{ marginRight: 5 }}
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                {activeStep === steps.length - 1 ? "Review" : "Back"}
              </Button>

              <Button
                sx={{ marginRight: 5 }}
                variant="contained"
                color="primary"
               // onClick={handleNext}
                type="submit"
                
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
              </form>
            </FormProvider>
          </div>

         
        </>
      )}
    </>
  );
};

export default Steper;