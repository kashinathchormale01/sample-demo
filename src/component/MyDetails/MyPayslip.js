import React, { Fragment, useState } from "react";
import { Button, Typography } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Invoice from "../../global/common/Reports/Invoice";
import myInvoice from "../../global/common/Reports/Data";
import axiosHttp from "../../AxiosInstance";
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
  const handleDownload = async () => {
    const encryptedId = sessionStorage.getItem("Id");
    const bytes = await CryptoJS.AES.decrypt(sessionStorage.getItem("Id"), "nks");
    const originalId = await bytes.toString(CryptoJS.enc.Utf8);

   // const blob = await pdf(<Invoice invoice={myPayslipData} />).toBlob();
    //saveAs(blob, "MyPaySlip.pdf");
    try {
      let result = await axiosHttp.get(`/GetPaySlip/${originalId}`);
       //setWageslipData(result.data.data);
      console.log('myslipData',result.data.data) ;
      setLoading(false);
      const blob = await pdf(<Invoice invoice={result.data.data}/>).toBlob()
      saveAs(blob, 'wageslip.pdf')
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }

  };
  return (
    <Fragment>
      { userRole !== 'Admin' && userRole !== 'Super' ? ( 
      <Button onClick={handleDownload}>Download My Wageslip</Button>
      ):(<Typography color="error">Admin account do not have Payslip!!</Typography>)}
      {/* <PDFViewer style={{ width: '100%', height: '100vh' }} className="app" >
           
                <Invoice invoice={invoice}/>
          
            </PDFViewer> */}
    </Fragment>
  );
};

export default MyPayslip;
