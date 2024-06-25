import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DateSite from '../GenerateBill/DateSite'
import SelectEmp from '../GenerateBill/SelectEmp'
import Rates from '../GenerateBill/Rates'
import VerticatReview from '../GenerateBill/VerticalReview'
import {
  useForm,
  FormProvider,

} from "react-hook-form";
import { toast } from 'react-toastify';
import axiosHttp from '../../../AxiosInstance';
import moment from 'moment';

function getSteps() {
    return [
      "Select Date and Sites",
      "SelectEmployee",
      "Rates",
      "Review Details",
    ];
  }
  let values={};
const VerticalStepper = () => {

  let selectedEmps = sessionStorage?.getItem('selectedemp')?.split(",")?.map(Number);
    const steps = getSteps();
    const methods = useForm();

    function getActiveStepContent(steps) {
        switch (steps) {
          case 0:
            return <DateSite {...values} />;
      
          case 1:
            return <SelectEmp {...values} />;
      
          case 2:
            return <Rates {...values} />;
      
          case 3:
            return <VerticatReview {...values}/>;
      
     
      
          default:
            break;
        }
      }
    
    const [activeStep, setActiveStep] = React.useState(0);

    function handleDatealert(){
      if (activeStep === 0) {
        alert('Hi');
       let sessionsiteids = [];
       sessionsiteids.push(sessionStorage.getItem("site.Id"));
       const newsiteData = sessionsiteids[0].split(",").map((item) => parseInt(item));
       const makepayloadForDate = {
        siteId: newsiteData,
        billStartDate: sessionStorage.getItem('billStartDate'),
        billEndDate: sessionStorage.getItem('billEndDate'),
       }
       console.log('makepayloadForDate',makepayloadForDate)
      }
    }

    const handleNext = (data) => {
      //console.log('values',data);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      console.log('steps.length',activeStep)
      
      if(activeStep === steps.length-1){
        //console.log('last step');

        let sessionsids = [];
        sessionsids.push(sessionStorage.getItem("site.Id"));
        //console.log("sessionsids", sessionsids);
        const newsiteData = sessionsids[0].split(",").map((item) => parseInt(item));
        //console.log("newsessionsids in emp page", newsiteData);

        const datagridstatedata = JSON.parse(sessionStorage.getItem('dataGridState'));
        const filtereddatagridstatedata = Object.keys(datagridstatedata)
          .filter((key) => selectedEmps.includes(parseInt(key, 10)))
          .reduce((obj, key) => {
            obj[key] = datagridstatedata[key];
            return obj;
          }, {});

       // console.log('filteredResponse',filtereddatagridstatedata);

        const vstepperPayload = {
            siteId: newsiteData,
            selectedEmployee: selectedEmps,
            billStartDate: sessionStorage.getItem('billStartDate'),
            billEndDate: sessionStorage.getItem('billEndDate'),
            dataGridState: filtereddatagridstatedata,
            rateGridState: JSON.parse(sessionStorage.getItem('rateGridState')),
          }
         // console.log('verticalstepPayload',vstepperPayload);

          axiosHttp
   .post("/SaveBill",vstepperPayload)
   .then((res) => {
    if(res.data.msg)
      toast.success(res.data.msg);
    const keysToRemove = ['rateGridState', 'site.Id', 'billEndDate', 'dataGridState', 'selectedemp', 'billStartDate'];

// Remove each item from sessionStorage
keysToRemove.forEach(key => {
    sessionStorage.removeItem(key);
});
   })
   .catch((error) => {
    console.log(error);
  });
      }
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);      
    };
  
    return (
      <Box sx={{ width: "100%" ,display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <Paper sx={{padding:'10px', width:'auto', minWidth:'60%'}}>
        <FormProvider>
        <form
                onSubmit={methods.handleSubmit(handleNext)}
                style={{ alignContent: "center" }}
              >
        <Stepper activeStep={activeStep}  orientation="vertical" sx={{width:"100%"}}>
          {steps.map((step, index) => (
      
            <Step key={index}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption"></Typography>
                  ) : null
                }
              >
                {steps[index]}
              </StepLabel>
              <StepContent>
                <Typography component={'span'} sx={{minHeight:"60vh"}}>  {getActiveStepContent(activeStep)}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      type='submit'
                    //  onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        </form>
        </FormProvider>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>

        )}
        </Paper>
      </Box>
    );
}

export default VerticalStepper