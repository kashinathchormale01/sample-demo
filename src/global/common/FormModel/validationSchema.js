import * as Yup from 'yup';
// import {moment} from 'moment';
import CommonFormModel from './formModel';
const {
  formField: {
    // profile form
    firstName,
    lastName,
    gender,
    dateOfBirth,
    aadharNumber,
    fatherSpouseName,
    educationLevel,
    dateOfJoning,

    // bank form
    bankName,
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
    serviceRemark,
    //Communication and Bio Form
    presentAddress,
    permanentAddress,
    cityName,
    markOfIdentification,
    mobileNumber,
  }
} = CommonFormModel;

// const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const aadharRegEx = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
const pannumberRegEx = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
const uanNumberRegEx = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
const mobileNumberRegEx = /^[0-9]{10}$/;

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
    [aadharNumber.name]: Yup.string()
      .required(`${aadharNumber.requiredErrorMsg}`)
      .matches(aadharRegEx, aadharNumber.invalidErrorMsg),
    [fatherSpouseName.name]: Yup.string().required(`${fatherSpouseName.requiredErrorMsg}`),
    // [educationLevel.name]: Yup.string()
    //   .nullable()
    //   .required(`${educationLevel.requiredErrorMsg}`),
    [dateOfJoning.name]: Yup.string()
      .nullable()
      .required(`${dateOfJoning.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    //Bank form validation
    [bankName.name]: Yup.string().required(`${bankName.requiredErrorMsg}`),
    [bankAccountNumber.name]: Yup.string().required(`${bankAccountNumber.requiredErrorMsg}`),
    [ifscCode.name]: Yup.string().required(`${ifscCode.requiredErrorMsg}`),
    [panNumber.name]: Yup.string().required(`${panNumber.requiredErrorMsg}`).matches(pannumberRegEx,panNumber.invalidErrorMsg),
    [uan.name]: Yup.string().required(`${uan.requiredErrorMsg}`).matches(uanNumberRegEx,uan.invalidErrorMsg),
    [pfNumber.name]: Yup.string().required(`${pfNumber.requiredErrorMsg}`),
    [esicIP.name]: Yup.string().required(`${esicIP.requiredErrorMsg}`),
    [lwf.name]: Yup.string().required(`${lwf.requiredErrorMsg}`),
  }),
  Yup.object().shape({   
    //Work form validation
    [siteLocaion.name]: Yup.string().required(`${siteLocaion.requiredErrorMsg}`),
    [categoryWork.name]: Yup.string().required(`${categoryWork.requiredErrorMsg}`),
    [designation.name]: Yup.string().required(`${designation.requiredErrorMsg}`),
    [serviceBookNumber.name]: Yup.string().required(`${serviceBookNumber.requiredErrorMsg}`),
    [serviceRemark.name]: Yup.string().required(`${serviceRemark.requiredErrorMsg}`),
  }),
  Yup.object().shape({   
    //Comm and Bio form validation
    [presentAddress.name]: Yup.string().required(`${presentAddress.requiredErrorMsg}`),
    [permanentAddress.name]: Yup.string().required(`${permanentAddress.requiredErrorMsg}`),
    [cityName.name]: Yup.string().required(`${cityName.requiredErrorMsg}`),
    [markOfIdentification.name]: Yup.string().required(`${markOfIdentification.requiredErrorMsg}`),
    [mobileNumber.name]: Yup.string().required(`${mobileNumber.requiredErrorMsg}`).matches(mobileNumberRegEx,mobileNumber.invalidErrorMsg),
  }),
];
