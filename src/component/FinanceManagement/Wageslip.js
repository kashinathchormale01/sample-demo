import React,{Fragment} from 'react';
import { Button } from '@mui/material';
import { pdf} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Invoice from '../../global/common/Reports/Invoice';
import invoice from '../../global/common/Reports/Data';

const WageSlip = () => {
  const handleDownload = async () => {
    const blob = await pdf(<Invoice invoice={invoice}/>).toBlob()
    saveAs(blob, 'wageslip.pdf')
  }
  return (   
    <Fragment>
      <Button onClick={handleDownload}>Download Wageslip</Button>            
    </Fragment>
  );
};

export default WageSlip;