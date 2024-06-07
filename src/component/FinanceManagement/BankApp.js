import React, { useState } from 'react'

const BankApp = (props) => {
    const [applicationData, setApplicationData] = useState(props.data);
  return (
    <>
    {applicationData?.map((data, index) => (
        <React.Fragment key={index}>
       {/* <a onClick={generatePDF}>Bank Application</a> */}
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
                               <p>Dated on. <b>{data?.chequeDateApp.toLocaleDateString()}</b> draw in faviour of you, for Rs. <b>{data?.AmountbnkApp}</b> /- and arrange to credit the amount mentioned against each Workman to their respective saving  Bank A/C. No. held by you and conform having Done so.</p>
                               <p>Thanking You,</p>
                               <p><b>{data?.chequeBy}</b></p>
                           </div>                       
                       </div>
   
                   </div>
               </div>
           </div> 
       </div>
       </div>
   
       {/* <button onClick={clickhandle}> Generate Bank Application in PDF</button> */}
       </React.Fragment> 
     ))}
     </>
  )
  
}

export default BankApp