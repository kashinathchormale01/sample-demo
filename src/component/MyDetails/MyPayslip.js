import React, { Fragment, useState,useEffect } from "react";
import { useForm } from 'react-hook-form';
import { TextField, Typography,FormControl, Box, Button, CircularProgress,InputLabel, MenuItem, Select } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Invoice from "../../global/common/Reports/Invoice";
import myInvoice from "../../global/common/Reports/Data";
import axiosHttp from "../../AxiosInstance";
import { toast } from "react-toastify";
import moment from "moment/moment";
const CryptoJS = require("crypto-js");


const MyPayslip = ({userRole}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myPayslipData, setMyPayslipData] = useState({
    items: [
      {
        serialNo: 1,
        registerNo: 1,
        pfAccountNo: 295,
        name: "Karan Harimohan Mewatfdfdfdf",
        fatherName: "Mahadev",
        sex: "M",
        designation: "Loader",
        daysWorked: 27,
        pl: 0,
        holidays: 4,
        rateofwage: 419,
        basicWages: 650.0,
        hra: 20.95,
        otHoursWorked: 0.0,
        hraFix: 20.95,
        totalWages: 11313,
        pf: 1358,
        pt: 200,
        esic: 132,
        otwages: 335,
        lwf: 0,
        coupon: 0,
        adv: 0,
        totalDeduction: 1690,
        netAmount: 15859,
      },
    ],
  });

  const [slipBill, setSlipBill] = useState();

  const { register, handleSubmit } = useForm();

  const loadslipBill = async () => {
    const bytes = await CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
    const originalId = await bytes.toString(CryptoJS.enc.Utf8);
    try {
      setLoading(true);
      let result = await axiosHttp.get(`/GetSlipBill/${originalId}`);
      setSlipBill(result.data.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setLoading(false);
        setError(err.message);
      } else if (err.request) {
        setLoading(false);
        setError(err.message);
      } else {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  //console.log('slipBill',slipBill)

  const onSubmit = async(data) => {
    
    console.log(data);
    const getpayslipPayload = {
      BillId:data.period,
      Emp_Id:sessionStorage.getItem("Id")
    }
    console.log('getpayslipPayload',getpayslipPayload);
    try {
      setLoading(true);
      let result = await axiosHttp.post(`/GetPaySlip`,getpayslipPayload);
       //setWageslipData(result.data.data);
       if(result.data.data.length>0){
       // console.log('myslipData',result.data.data.length) ;
        setLoading(false);
        const blob = await pdf(<Invoice invoice={result.data.data}/>).toBlob()
        saveAs(blob, 'wageslip.pdf')
       }else{
        setLoading(false);
      //  console.log('no data',result.data.data.length) ;
        toast.error("There is no payslip data available for this employee, Please contact to concern person for more info.")
       }     
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    loadslipBill();
  }, []);

  // const handleDownload = async () => {
  //   const bytes = await CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
  //   const originalId = await bytes.toString(CryptoJS.enc.Utf8);

   
  //   try {
  //     setLoading(true);
  //     let result = await axiosHttp.post(`/GetPaySlip`);
  //      //setWageslipData(result.data.data);
  //      if(result.data.data.length>0){
  //      // console.log('myslipData',result.data.data.length) ;
  //       setLoading(false);
  //       const blob = await pdf(<Invoice invoice={result.data.data}/>).toBlob()
  //       saveAs(blob, 'wageslip.pdf')
  //      }else{
  //       setLoading(false);
  //     //  console.log('no data',result.data.data.length) ;
  //       toast.error("There is no payslip data available for this employee, Please contact to administrator for more info.")
  //      }     
  //   } catch (err) {
  //     setLoading(false);
  //     setError(err.message);
  //   }

  // };
  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  return (
    <Fragment>
      { userRole !== 'Admin' && userRole !== 'Super' ? ( 
        <>
 <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
         <form onSubmit={handleSubmit(onSubmit)}>
     
      <FormControl fullWidth>
        <InputLabel id="period-label">Period</InputLabel>
        <Select
          labelId="period-label"
          id="period"
          {...register('period')}
          defaultValue=""
        >
          {slipBill.map((item,index)=>(
            <MenuItem key={index} value={item.BillId}>{moment(item.fromdate).format('MMM/YY')} - {moment(item.todate).format('MMM/YY')}</MenuItem>
          ))}         
        </Select>
      </FormControl>
      
      <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
        Submit
      </Button>
    </form>
              </Box>
        {/* <Button onClick={handleDownload}>Download My Wageslip</Button> */}
      </>
      
      ):(<Typography color="error">Admin account do not have Payslip!!</Typography>)}
     
    </Fragment>
  );
};

export default MyPayslip;
