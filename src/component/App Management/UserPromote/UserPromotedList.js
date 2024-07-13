import React, { useState, useEffect,useMemo} from "react";
import axios from "axios";
import * as moment from 'moment';
import { Grid, Typography,FormControlLabel,Checkbox,Chip,CircularProgress } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,  
  createMRTColumnHelper
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable, { Row } from 'jspdf-autotable';
import axiosHttp from "../../../AxiosInstance";


const UserPromotedList = ({ sendempid }) => {
    const [promotedemplist, setPromotedemplist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const empData = promotedemplist;
    const [selectedRowsData, setSelectedRowsData] = React.useState();

  const loadpromotedEmployees = async () => {      
    try {
      let result = await axiosHttp.get('/GetEmpWorkData');
      setPromotedemplist(result.data.data);     
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

  useEffect(() => {
    loadpromotedEmployees();
  }, []);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const title = "Promoted User List";
    doc.text(title, 15, 10);
    const tableData = rows.map((row) => Object.values(row._valuesCache));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('PromotedUserList.pdf');
  }; 

  

  const columns = useMemo(
    () => [
      {
        id: 'Emp ID',
        header: 'Emp Id/UserName',
        size:50,
        accessorFn: (row) => `NKS-${row.empid}`,        
      },
      {
        id: 'fullname',
        header: 'Full Name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,         
        //Add a link in a cell render
        Cell: ({ renderedCellValue, cell }) => {
          return(<Typography style={{color:'#1976d2'}}>
          {renderedCellValue}
        </Typography>   )                 
        },
      },
      {
        id: 'PasswordResetLink',
        header: 'Password Reset',
        accessorFn: (row) => `Password Reset`,         
        //Add a link in a cell render
        Cell: ({ renderedCellValue, cell,row }) => {
          return(<Link style={{color:'red'}} to={`/user-password-reset`} state={{ id:row.original }}>
          {renderedCellValue}
        </Link>   )                 
        },
      },
              
      {
        accessorKey: 'RoleName',
        header: 'Designation',
        size:50         
      },    
      {
        accessorKey: 'SiteId',
        header: 'Work Locaion',
        size:50,
        Cell: ({ renderedCellValue }) => {
          const hasComma = renderedCellValue.split(',');
          return (
            hasComma.map((item,index)=>(<Chip key={index} label={item.trim()} color='warning' variant="outlined" sx={{ marginRight: "5px" }} />))
          );
        }         
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
    </Box>
    ),
    
  });
  
  if (error) return `Error: ${error.message}`;
  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  if (!empData.length) return <Typography color="error">No Employees available!</Typography>;

  return (
    <>      
    <MaterialReactTable table={table} />
    <pre style={{ fontSize: 10 }}>
      {JSON.stringify(selectedRowsData, null, 4)}
    </pre>
  </>
  )
}

export default UserPromotedList