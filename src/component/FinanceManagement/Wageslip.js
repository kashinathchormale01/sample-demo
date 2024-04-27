import React,{Fragment, useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { PDFViewer, pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Invoice from './reports/Invoice';
import invoice from './reports/Data';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//     padding: 10,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const styles = StyleSheet.create({
//     table: {
//       width: '100%',
//     //   border: '1px solid #000'
//     },
   
//     row: {
//       display: 'flex',
//       flexDirection: 'row',
//       borderTop: '1px solid #EEE',
//       paddingTop: 8,
//       paddingBottom: 8,
//       fontSize: '8px'
//     },
//     header: {
//       borderTop: 'none',
//     },
//     bold: {
//       fontWeight: 'bold',
//     },
//     // So Declarative and unDRY 👌
//     col1: {
//       width: '15%',
//       transform: 'rotate(270deg)',
//       verticalAlign:'sub'
//     },
//     col2: {
//       width: '7%',
//     },
//     col3: {
//       width: '15%',
//     },
//     col4: {
//       width: '20%',
//     },
//     col5: {
//       width: '10%',
//     },
//     col6: {
//         width: '7%',
//         color: 'green'
//       },
//   })



const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      padding: 0,
    },
    section: {
      margin: 0,
      padding: 0,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      fontSize:'8px'
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      flexWrap:"no-wrap",
      justifyContent:'center'
    },
    tableColHeader: {
        minWidth:'5%',
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "center",
      verticalAlign:'sub',
      justifyContent:'center'
    },
    tableCol: {
        minWidth:'5%',
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "center",
      justifyContent:'center'
    }
  });

const WageSlip = () => {
  const wageData = [
    {
      serialNo: 1,
      registerNo: 1,
      pfAccountNo: 295,
      name: 'KARAN HARIMOHAN KEWAT',
      fatherName: 'Mahadev',
      sex: 'M',
      designation: 'Loader',
      daysWorked: 27,
      basicWages: 650.00,
      hra: 20.95,
      otHoursWorked: 0.0,
      hraFix: 20.95,
      totalWages: 11313,
      pf: 1358,
      pt: 200,
      esic: 132,
      lwf: 0,
      coupon: 0,
      adv: 0,
      totalDeduction: 1690,
      netAmount: 15859,
    },
  ];

  const handleDownload = async () => {
    const blob = await pdf(<Invoice invoice={invoice}/>).toBlob()
    saveAs(blob, 'wageslip.pdf')
  }

  return (
   
    <Fragment>
      <Button onClick={handleDownload}>Download Wageslip</Button>
            {/* <PDFViewer style={{ width: '100%', height: '100vh' }} className="app" >
           
                <Invoice invoice={invoice}/>
          
            </PDFViewer> */}
    </Fragment>   
   
  );
};

export default WageSlip;