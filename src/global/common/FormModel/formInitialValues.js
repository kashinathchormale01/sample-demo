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
    nationality,
    educationLevel,
    dateOfJoning,
// bank form
    bankName,
    bankAccountNumber, 
    ifscCode,
    panNumber,
    UAN,
    pfNumber, 
    esicIP,  
    lwf,
    // work details form
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
    alternateMobileNumber
    }
} = CommonFormModel;

export default {
    // profile form
      [firstName.name]: '',
      [lastName.name]: '',
      [gender.name]: '',
      [dateOfBirth.name]: '',
      [aadharNumber.name]: '',
      [fatherSpouseName.name]: '',
      [nationality.name]: '',
      [educationLevel.name]: '',
      [dateOfJoning.name]: '',
    // bank form
      [bankName.name]: '',
      [bankAccountNumber.name]: '',
      [ifscCode.name]: '',
      [panNumber.name]: '',
      [UAN.name]: '',
      [pfNumber.name]: '',
      [esicIP.name]: '',
      [lwf.name]: '',
      // work details form
      [siteLocaion.name]: '',
      [categoryWork.name]: '',
      [designation.name]: '',
      [serviceBookNumber.name]: '',
      [serviceRemark.name]: '',
      // Communication and Bio form
      [presentAddress.name]: '',
      [permanentAddress.name]: '',
      [cityName.name]: '',
      [markOfIdentification.name]: '',
      [mobileNumber.name]: '',
      [alternateMobileNumber.name]: '',
    };