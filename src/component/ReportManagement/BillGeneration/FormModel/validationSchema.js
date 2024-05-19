import * as Yup from 'yup';
// import {moment} from 'moment';
import empRegisterFormModel from './BillGenModel';
const {
  formField: {
    // profile form
    selectedSite,
    startDate,
    endDate,
    

    
  }
} = empRegisterFormModel;

export default [
  Yup.object().shape({

    //Profile form validation
    [selectedSite.name]: Yup.string().required(`${selectedSite.requiredErrorMsg}`),
    [startDate.name]: Yup.string().required(`${startDate.requiredErrorMsg}`),
    [endDate.name]: Yup.string().required(`${endDate.requiredErrorMsg}`),
  }),
  
  
];
