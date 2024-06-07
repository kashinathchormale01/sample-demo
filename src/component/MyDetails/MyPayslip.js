import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Invoice from "../../global/common/Reports/Invoice";
import myInvoice from "../../global/common/Reports/Data";

const MyPayslip = () => {
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
    const blob = await pdf(<Invoice invoice={myPayslipData} />).toBlob();
    saveAs(blob, "MyPaySlip.pdf");
  };
  return (
    <Fragment>
      <Button onClick={handleDownload}>Download My Wageslip</Button>
      {/* <PDFViewer style={{ width: '100%', height: '100vh' }} className="app" >
           
                <Invoice invoice={invoice}/>
          
            </PDFViewer> */}
    </Fragment>
  );
};

export default MyPayslip;
