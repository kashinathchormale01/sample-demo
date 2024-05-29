import React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {  useFormContext,Controller } from "react-hook-form";
import dayjs from 'dayjs';




const MuiDatePicker = ({sentlabel,sentyear,sentname,defaultdate}) => {
  const { control,formState:{errors} } = useFormContext();
  const { register ,setValue} = useFormContext();
  const maxDate=dayjs().add(sentyear,'year');
  //console.log("mui datepicker ",sentname,maxDate.$d,defaultdate);
  const [value, setValueloc] = React.useState(dayjs(sentname==="dateOfBirth"? maxDate: defaultdate));
  //const putname=String(sentname);
//    const today=dayjs();
const firstrun=()=>{

  //console.log("sent date",defaultdate,"converted Date",dayjs(defaultdate).$d)
  register(sentname,{required:false});
  setValue(sentname,dayjs(defaultdate).format('YYYY/MM/DD'));
}
   
  // console.log("sent year is",sentyear,"assigned year",dayjs(value).format('DD/MM/YYYY'));

   const handleChange = (sentvalue) => {
    
    setValue(sentname,dayjs(sentvalue).format('YYYY/MM/DD'));
    setValueloc(sentvalue);
   }


   React.useEffect(()=>{
    firstrun();
  },[])

  return (



    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer sx={{height:1}} components={['DatePicker', 'DatePicker', 'DatePicker']}>
    <DatePicker
      label={sentlabel}
      format="DD/MM/YYYY"
      value={value}
     
      onChange={(newValue) =>(handleChange(newValue))}
      maxDate={maxDate}
      
      views={['year', 'month', 'day']}
    />
    
  </DemoContainer>
</LocalizationProvider>
  );



  
};

export default MuiDatePicker;
