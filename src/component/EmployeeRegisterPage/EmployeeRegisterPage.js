import React,{useState} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { CircularProgress, Typography, Button,ButtonGroup } from '@mui/material';
import { Formik, Form } from 'formik';
import { toast } from "react-toastify";

import EmpProfileForm from './Forms/EmpProfileForm';
import EmpBankForm from './Forms/EmpBankForm';
import EmpWorkForm from './Forms/EmpWorkForm';
import EmpCommBioForm from './Forms/EmpCommBioForm';
import EmpFormSuccess from './EmpFormSuccess';
import ReviewForm from './FormReview';

import validationSchema from './../../global/common/FormModel/validationSchema';
import formInitialValues from './../../global/common/FormModel/formInitialValues';
import EmpRegisterModel from './../../global/common/FormModel/formModel';

const steps = ['Profile', 'Bank Details','Work Details','Communication and Bio Details','Review Details'];

const { formId, formField } = EmpRegisterModel;

function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <EmpProfileForm formField={formField} />;
      case 1:
        return <EmpBankForm formField={formField} />;
      case 2:
        return <EmpWorkForm formField={formField} />;
      case 3:
        return <EmpCommBioForm formField={formField} />;
      case 4:
        return <ReviewForm />;
      default:
        return <div>Not Found</div>;        
    }
  }

  const EmployeeRegisterPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        // console.log(JSON.stringify(values))
        axios.post('/SaveEmp', values)
        .then(res=>{
          console.log(res);
          console.log(res.data);
          toast.success(res.msg);
        }) 
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

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
      <>
        <Box p={3} sx={{ width: "100%" }}>
          <Typography mb={4} variant="h4" align="center" sx={{fontSize:'18px', fontWeight:'500', textDecoration:'underline', color:'#1976d2'}}>
            Employee Register Page
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
          <EmpFormSuccess />
          ) : (

            <Formik
            initialValues={formInitialValues}
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
    );

  }

  export default EmployeeRegisterPage