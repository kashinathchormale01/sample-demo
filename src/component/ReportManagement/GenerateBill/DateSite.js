import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import axios from 'axios';
import {
  
  useFormContext,
  Controller} from "react-hook-form";
import axiosHttp from '../../../AxiosInstance';

// const =site
// axios
// .post("http://localhost:8089/Login", sendingdata)
// .then((res) => {
//  console.log(res);
//   if(res.data.msg==="Succesfull")
//   {
//   console.log("success");


//    sessionStorage.setItem("token",res.data.Key);

//    navigate("/Afterlogin");
//   }
//   else
//   {
//     alert(res.data.msg);
//     console.log("Session Invalid");
//   }
// })
// .catch((error) => {
//   console.log(error);
// });

const DateSite = () => {
  const { control } = useFormContext();
  const { register ,setValue,getValues} = useFormContext();
const [sitedata,setSitedata]=React.useState();
  //const sitedata1=getsiteData();

//const sitedata=getsiteData();
React.useEffect(()=>{
  

     axiosHttp
   .get("/GetProj_Site")
   .then((res) => {
    //console.log(res);
     if(res.data.msg==="Sites Dilo Bagh")
     {
   //  console.log("success",res.data.data);
   
   setSitedata(res.data.data);
    // console.log("in axios call",sitedata)
     // return(res.data.data);
      
     }
     else
     {
       alert(res.data.msg);
       console.log("Erro occured");
     }
   })
   .catch((error) => {
     console.log(error);
   });
   
  
},[])

const handlChange=(e)=>{
console.log("chacked change",e.target.value);

}

//console.log("sitedata",sitedata);


  return (
  <div className='monthlyDatePicker' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['MonthCalendar']} sx={{display:"flex",flexDirection:"row",justifyContent:"center",verticalAlign:"baseline"}}>
       <DemoItem key={"1"} sx={{ m: 4 }} label="From ">
          <MonthCalendar className='monthcal'  />
        </DemoItem>
        <DemoItem key={"2"} sx={{marginTop:"0"}} label="To ">
          <MonthCalendar  className='monthcal 2ndmonth' />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    <div className='checboxwrapper' > 
    {
    sitedata?.map((value,index)=>{
    //  console.log("datat proccesing",value.Id);
      return(

        
        <FormControlLabel key={index} onChange={handlChange} value={value.Id} control={<Checkbox defaultChecked />} label={value.siteName} />
      );
    })}
    
  
    </div>
  </div>
  )
}

export default DateSite