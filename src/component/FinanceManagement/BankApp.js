import { Button } from '@mui/material';
import React, { useState, useEffect} from 'react';
import jsPDF from "jspdf";
import pdf from './BankApplication.pdf';
import headimg from './header.png';

const BankApp = (props) => {
    const [applicationData, setApplicationData] = useState(props.data);
    useEffect(() => {
        setApplicationData(props.data);
      }, [props.data]); 

      const clickhandle = async()=>{

      }
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
      };

      const source = document.getElementById("converts");

      const generatePDF = () => {    
        let doc = new jsPDF("p", "pt");
       doc.addImage(headimg, 'png', 20, 10, 550, 84);
        doc.text(20, 20, "This is the first title.");
        doc.addFont("helvetica", "normal");
        doc.text(20, 60, "This is the second title.");
        doc.text(20, 100, "This is the thrid title.");  
        doc.html(source, { margin:[100, 10, 10, 10],autoPaging:'text',callback: (doc) => doc.save("BankApplication.pdf") });
        doc.save("demo.pdf");
      };

  return (
    <>
    {applicationData?.map((data, index) => (
        <React.Fragment key={index}>
       <a onClick={generatePDF}>Bank Application</a>
       <div id="converts">
       <div className="card border-0 shadow overflow-hidden p-2 rounded-0">
           <div className="row align-items-center no-gutters">
               <div className="col-md-12 order-2 order-md-1">
                   <div className="card-body content">   
                       <div className="row"> 
                           <div className="col-12 mb-4">
                               <p className="mb-1" style={{textAlign:'right'}}>Date: {data?.applicationDate.toLocaleDateString()}</p>
                               <p className="mb-0">To,</p>
                               <p className="mb-0"><b>{data?.bnkNameApp}</b></p>
                               <p className="mb-0"><b>{data?.bnkBranchApp}</b></p>  
                               <p className="mb-0"><b>{data?.bankAdress}</b></p>                         
                           </div>   
                           <div className="col-12">
                               <p>Dear Sir/Madam,</p>   
                               <p>Enclosed please find a list of our workman and Cheque Number. <b>{data?.chequenumApp}</b></p>
                               <p>Dated on. <b>{data?.chequeDateApp.toLocaleDateString()}</b> draw in faviour of you, for Rs. <b>{formatCurrency(data?.AmountbnkApp)}</b> /- and arrange to credit the amount mentioned against each Workman to their respective saving  Bank A/C. No. held by you and conform having Done so.</p>
                               <p>Thanking You,</p>
                               <p><b>{data?.chequeBy}</b></p>
                           </div>                       
                       </div>
   
                   </div>
               </div>
           </div> 
       </div>
       </div>
   
       <Button onClick={clickhandle}> Generate Bank Application in PDF</Button>
       </React.Fragment> 
     ))}
     </>
  )
  
}

export default BankApp