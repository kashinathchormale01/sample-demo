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

// const steps = [
//     {
//       label: 'Select campaign settings',
//       description: `For each ad campaign that you create, you can control how much
//                 you're willing to spend on clicks and conversions, which networks
//                 and geographical locations you want your ads to show on, and more.`,
//     },
//     {
//       label: 'Create an ad group',
//       description:
//         'An ad group contains one or more ads which target a shared set of keywords.',
//     },
//     {
//       label: 'Create an ad',
//       description: `Try out different ad text to see what brings in the most customers,
//                 and learn how to enhance your ads using features like ad extensions.
//                 If you run into any problems with your ads, find out how to tell if
//                 they're running and how to resolve approval issues.`,
//     },
//   ];

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

    const handleNext = (data) => {
      console.log(data);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
      <Box sx={{ width: "100%" ,display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <Paper sx={{padding:'10px', backgroundColor:'#fcffff', width:'auto', minWidth:'60%'}}>
        <FormProvider>
        <form
                // onSubmit={methods.handleSubmit(handleNext)}
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