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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const empData = emplist;
  const [selectedRowsId, setSelectedRowsId] = React.useState([]);
  const [selectedRowsData, setSelectedRowsData] = React.useState();

const loadEmployees = async () => {      
  try {
    let result = await axios.get('/GetEmp');
    setEmplist(result.data.data);     
    setLoading(false);    
} catch (err) {
    if (err.response) {
      setLoading(false);    
      setError(err.message);       
    } else if (err.request) {
      setLoading(false);
      setError(err.message);      
    } else {
        // Anything else
        setLoading(false);
        setError(err.message);     
    }
}
  
};

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row._valuesCache));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  }; 

  const handleDownloadRows = (rows) => {
    // alert('Hi')
    const tableData = rows.map((row) => Object.values(row.original));
    setSelectedRowsData(tableData);
    // console.log('Hi',tableData)
    console.log('Hi',selectedRowsData)
  }
    
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
        Cell: ({ renderedCellValue, cell, row }) => {
          return(<Link style={{color:'#1976d2'}} to={{pathname:`/employee-details`}} state={{ id:row.original }}>
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
        accessorKey: 'mobileNumber',
        header: 'Mobile Number',
        size:50         
      },   
      {
        accessorKey: 'RoleName',
        header: 'Designation',
        size:50         
      },
      {
        accessorKey: 'CategoryWork',
        header: 'Work Category',
        size:50         
      },    
      {
        accessorKey: 'siteName',
        header: 'Work Locaion',
        size:50         
      }       
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data:empData,
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
      <Button
        disabled={
          !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
        }
        //only export selected rows
        onClick={() => handleDownloadRows(table.getSelectedRowModel().rows)}
        startIcon={<FileDownloadIcon />}
      >
        Download Selected Rows
      </Button>
    </Box>
    ),
    
  });

  // console.log(table.getRowModel().rows)

  if (error) return `Error: ${error.message}`;
  if (!empData.length) return "No Employees available!";


  return (
    <>      
      <MaterialReactTable table={table} />
      <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedRowsData, null, 4)}
      </pre>
    </>
  );
};

export default EmployeeList;
