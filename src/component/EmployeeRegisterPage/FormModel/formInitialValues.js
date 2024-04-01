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
  }
} = empRegisterFormModel;

export default {
// profile form
  [firstName.name]: '',
  [lastName.name]: '',
  [gender.name]: '',
  [dateOfBirth.name]: '',
  [addharnumber.name]: '',
  [fatherSpouseName.name]: '',
  [nationality.name]: '',
  [educationLevel.name]: '',
  [dateOfJoning.name]: '',
// bank form
  [banktName.name]: '',
  [bankAccountNumber.name]: '',
  [ifscCode.name]: '',
  [panNumber.name]: '',
  [uan.name]: '',
  [pfNumber.name]: '',
  [esicIP.name]: '',
  [lwf.name]: '',
};
