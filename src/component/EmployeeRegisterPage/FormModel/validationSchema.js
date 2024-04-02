import * as Yup from 'yup';
// import {moment} from 'moment';
import empRegisterFormModel from './EmpRegisterModel';
const {
  formField: {
    // profile form
    firstName,
    lastName,
    gender,
    dateOfBirth,
    addharnumber,
    fatherSpouseName,
    nationality,
    educationLevel,
    dateOfJoning,

    // bank form
    banktName,
    bankAccountNumber, 
    ifscCode,
    panNumber,
    uan,
    pfNumber, 
    esicIP,  
    lwf,
    // Work detail form
    siteLocaion,
    categoryWork,
    designation,
    serviceBookNumber,
    serviceRemark
  }
} = empRegisterFormModel;

// const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const aadharRegEx = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
const pannumberRegEx = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
const uanNumberRegEx = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;

export default [
  Yup.object().shape({

    //Profile form validation
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [gender.name]: Yup.string()
      .nullable()
      .required(`${gender.requiredErrorMsg}`),
    [dateOfBirth.name]: Yup.string()
      .nullable()
      .required(`${dateOfBirth.requiredErrorMsg}`),
    [addharnumber.name]: Yup.string()
      .required(`${addharnumber.requiredErrorMsg}`)
      .matches(aadharRegEx, addharnumber.invalidErrorMsg),
    [fatherSpouseName.name]: Yup.string().required(`${fatherSpouseName.requiredErrorMsg}`),
    [nationality.name]: Yup.string()
      .nullable()
      .required(`${nationality.requiredErrorMsg}`),
    [educationLevel.name]: Yup.string()
      .nullable()
      .required(`${educationLevel.requiredErrorMsg}`),
    [dateOfJoning.name]: Yup.string()
      .nullable()
      .required(`${dateOfJoning.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [banktName.name]: Yup.string().required(`${banktName.requiredErrorMsg}`),
    [bankAccountNumber.name]: Yup.string().required(`${bankAccountNumber.requiredErrorMsg}`),
    [ifscCode.name]: Yup.string().required(`${ifscCode.requiredErrorMsg}`),
    [panNumber.name]: Yup.string().required(`${panNumber.requiredErrorMsg}`).matches(pannumberRegEx,panNumber.invalidErrorMsg),
    [uan.name]: Yup.string().required(`${uan.requiredErrorMsg}`).matches(uanNumberRegEx,uan.invalidErrorMsg),
    [pfNumber.name]: Yup.string().required(`${pfNumber.requiredErrorMsg}`),
    [esicIP.name]: Yup.string().required(`${esicIP.requiredErrorMsg}`),
    [lwf.name]: Yup.string().required(`${lwf.requiredErrorMsg}`),
  }),
  Yup.object().shape({   
    [siteLocaion.name]: Yup.string().required(`${siteLocaion.requiredErrorMsg}`),
    [categoryWork.name]: Yup.string().required(`${categoryWork.requiredErrorMsg}`),
    [designation.name]: Yup.string().required(`${designation.requiredErrorMsg}`),
    [serviceBookNumber.name]: Yup.string().required(`${serviceBookNumber.requiredErrorMsg}`),
    [serviceRemark.name]: Yup.string().required(`${serviceRemark.requiredErrorMsg}`),
  }),
];
