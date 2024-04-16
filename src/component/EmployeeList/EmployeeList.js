import React, { useState, useEffect,useMemo} from "react";
import axios from "axios";
import * as moment from 'moment';
import { Grid, Typography,FormControlLabel,Checkbox } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,  
  createMRTColumnHelper
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

// const baseURL = "http://192.168.1.121:8089/api/GetEmp";



const EmployeeList = () => {
  const [emplist, setEmplist] = useState([]);
  const [error, setError] = useState();

const fakeData = emplist;

function loadSelectedEmployee() {
  axios
    .get(`/GetEmp`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      setEmplist(res.data.data);
    });
}

  useEffect(() => {
    loadSelectedEmployee();
  }, []);

  const handleExportRows = (rows) => {
    const doc = new jsPDF('landscape');
    const tableData = rows.map((row) => Object.keys(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };



  // const handleCheckboxChange = (event) => {
  
  //   setSelectedCheckbox(event.target.value)
   
  // }

  const columns = useMemo(
    () => [
      {
        id: 'Emp ID',
        header: 'Emp Id/S.B.N.',
        size:50,
        accessorFn: (row) => `NKS-${row.Id}`,        
      },
      {
        id: 'fullname',
        header: 'Full Name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,         
        //Add a link in a cell render
        Cell: ({ renderedCellValue, cell }) => {
          return(<Link style={{color:'#1976d2'}} to={{pathname:`/employee-details`}}>
          {renderedCellValue}
        </Link>   )                 
        },
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size:50         
      },
      {
        accessorKey: 'dateOfBirth',
        header: 'Date Of Birth',
        accessorFn: (row) => `${moment(row.dateOfBirth).format('DD/MM/YYYY')}`,
        size:50         
      },     
      {
        accessorKey: 'designation',
        header: 'Designation',
        size:50         
      },
      {
        accessorKey: 'siteLocaion',
        header: 'Work Locaion',
        size:50         
      },
      {
        accessorKey: 'mobileNumber',
        header: 'Mobile Number',
        size:50         
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data:fakeData,
    enableRowSelection: true,
    enableEditing: false,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',    
    renderTopToolbarCustomActions: ({ table }) => (  
      <Box
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        flexWrap: 'wrap',
      }}
    >
      <Typography>Employee List</Typography>
      <Button
        disabled={table.getPrePaginationRowModel().rows.length === 0}
        //export all rows, including from the next page, (still respects filtering and sorting)
        onClick={() =>
          handleExportRows(table.getPrePaginationRowModel().rows)
        }
        startIcon={<FileDownloadIcon />}
      >
        Export All Rows
      </Button>
      <Button
        disabled={table.getRowModel().rows.length === 0}
        //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
        onClick={() => handleExportRows(table.getRowModel().rows)}
        startIcon={<FileDownloadIcon />}
      >
        Export Page Rows
      </Button>
      <Button
        disabled={
          !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
        }
        //only export selected rows
        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
        startIcon={<FileDownloadIcon />}
      >
        Export Selected Rows
      </Button>
    </Box>
    ),
    
  });


  if (error) return `Error: ${error.message}`;
  if (!emplist) return "No Employees available!"

  return (
    <>      
      <MaterialReactTable table={table} />
    </>
  );
};

export default EmployeeList;
