import empBillGenFormModel from './BillGenModel';
const {
  formField: {
// profile form
selectedSite,
startDate,
endDate,

  }
} = empBillGenFormModel;

export default {
// profile form
  [selectedSite.name]: '',
  [startDate.name]: '',
  [endDate.name]: '', 
};
