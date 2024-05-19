import React,{useState} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { CircularProgress, Typography, Button,ButtonGroup } from '@mui/material';
import { Formik, Form } from 'formik';
import { toast } from "react-toastify";

import validationSchema from './FormModel/validationSchema';
import BillGenModel from './FormModel/BillGenModel';
import BillInitialValues from './FormModel/BillInitialValues';
import BillSitePage from '../Comp/BillSitePage';
import BillEmp from '../Comp/BillEmp';
import RatesBill from '../Comp/RatesBill';

const steps = ['Select Site', 'Select Employee','Rate Chart'];

const { formId, formField } = BillGenModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <BillSitePage formField={formField} />;
    case 1:
      return <BillEmp formField={formField} />;
    case 2:
      return <RatesBill formField={formField} />;   
    default:
      return <div>Not Found</div>;        
  }
}



const BillGenerationStepper = () => {

  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values, actions) {
    await _sleep(1000);
     console.log(JSON.stringify(values))
   
    // let categoryId = localStorage.getItem('selectedCategoryId');
    // let siteId = localStorage.getItem('selectedsiteId');
    // let roleId = localStorage.getItem('selectedroleId');
    // let sitepageIdsobj ={categoryId:categoryId, siteId:siteId, roleId:roleId};
    // const sendingdata = {values, sitepageIdsobj};
    // axios.post('/SaveEmp', sendingdata)
    // .then(res=>{
    //   console.log(res);
    //   console.log(res.data);
    //   toast.success(res.msg);
    // }) 
    // alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);    
    setActiveStep(activeStep + 1); 
}

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
}

  function _sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
}
  return (
    <>
    <Box p={3} sx={{ width: "100%" }}>
      <Typography mb={4} variant="h4" align="center" sx={{fontSize:'18px', fontWeight:'500', textDecoration:'underline', color:'#1976d2'}}>
        Generate Employee Bill
      </Typography>
      <Box sx={{width:'100%'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {/* Step label */}
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Box>
      <>
      {activeStep === steps.length ? (
      <>Bill Sucessfull submitted</>
      ) : (

        <Formik
        initialValues={BillInitialValues}
        validationSchema={currentValidationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id={formId}>
            {_renderStepContent(activeStep)}

            <ButtonGroup 
                variant="contained"
                aria-label="Basic button group" 
                className='stepFormButtonGroup'             
              >
                {activeStep !== 0 && (
                  <Button onClick={_handleBack}>Back</Button>
                )}
                
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    
                  >
                    {isLastStep ? "Submit" : "Next"}
                  </Button>
                  {isSubmitting && <CircularProgress size={24} />}
              </ButtonGroup>               
          </Form>
        )}
      </Formik>
    )}
      </>
    </Box>
  </>
  )
}

export default BillGenerationStepper