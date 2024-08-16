import React, { useState, useEffect,useMemo} from "react";
import * as moment from 'moment';
import { Typography,CircularProgress} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,  
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { useNavigate } from "react-router-dom";
import axiosHttp from "../../../AxiosInstance";
import { toast } from "react-toastify";
let Buffer = require('buffer/').Buffer;

const EmployeeInActiveList = () => {
    const navigate = useNavigate();
    const [emplist, setEmplist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const empData = emplist;
    const [selectedRowsData, setSelectedRowsData] = React.useState();
    const [profileimg, setProfileimg] = useState([]);
  
  const loadEmployees = async () => {      
    try {
      let result = await axiosHttp.get('/GetInactiveList');
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
      const title = "Employee List";
      doc.text(title, 15, 10);
      const tableData = rows.map((row) => Object.values(row._valuesCache));
      const tableHeaders = columns.map((c) => c.header);
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
  
      doc.save('Employee-List.pdf');
    }; 
  
    
    const handleInactive = async (id) => {
      //  console.log('id clicked', id)
      if (window.confirm("Are you sure you want to make active this employee?")) {
        try {
          let result = await axiosHttp.put(`/ActivateEmp/${id}`);
          toast.success(result.data.msg);
          loadEmployees();
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(err.message);
        }
      }
    };
      
    const columns = useMemo(
      () => [       
        {
          id: "actions",
          header: "Actions",
          accessorFn: (row) => ``,
          Cell: ({ row }) => {
            return(<Box state={{ id:row.original }}>            
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleInactive(row.original.Id)}
                style={{ marginRight: 10 }}
              >
                Make Active
              </Button>
            </Box>)                 
          },
        }, 
        {
          id: 'EmpID',
          header: 'Emp Id',
          accessorFn: (row) => `NKS-${row.Id}`,        
        },
        {
          id: 'fullname',
          header: 'Full Name',
          accessorFn: (row) => `${row.firstName} ${row.lastName}`,   
          Cell: ({ renderedCellValue, cell, row }) => {
            return(<Link style={{color:'#1976d2'}} to={{pathname:`/employee-details`}} state={{ id:row.original }}>
            {renderedCellValue}
          </Link>   )                 
          },
        },           
        {
          accessorKey: 'doe',
          header: 'Date Of Exit',
          accessorFn: (row) => `${moment(row.doe).format('DD/MM/YYYY')}`,
        },  
        {
          accessorKey: 'mobileNumber',
          header: 'Mobile Number',
        },   
        {
          accessorKey: 'RoleName',
          header: 'Designation',
        },
        {
          accessorKey: 'CategoryWork',
          header: 'Work Category',
        },    
        {
          accessorKey: 'siteName',
          header: 'Work Locaion',
        },
        {
         accessorKey:'empstatus',
         header:'Employee Status',
        },
           
      ],
      [],
    );
  
    const table = useMaterialReactTable({
      columns,
      data: empData,
      enableRowSelection: true,
      enableEditing: false,
      columnFilterDisplayMode: "popover",
      paginationDisplayMode: "pages",
      positionToolbarAlertBanner: "bottom",
      initialState: {
        sorting: [
          {
            id: 'EmpID', //sort by age by default on page load
            desc: true,
          }        
        ],
      },
      defaultColumn: {
        minSize: 20, //allow columns to get smaller than default
        maxSize: 9001, //allow columns to get larger than default
        size: 20, //make columns wider by default
      },
      muiTableBodyRowProps: ({ row }) => ({
        onDoubleClick: async (event) => {
          console.log("before row data original", row.original);
          if (row.original.Id) {
            try {
              console.log("getting", row.original.Id);
              const result = await axiosHttp.get(
                `/GetEmpImage/${row.original.Id}`
              );
              console.log("profileimg", result.data.data[0].ImageSave);
              const imgbuffer = Buffer.from(result.data.data[0].ImageSave);
              const imageUrl = imgbuffer.toString();
         
              row.original.img = imageUrl;
              // setProfileimg(result.data.data[0].ImageSave);
              // methods.setValue("img",result.data.data[0].ImageSave);
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
          }
          console.log("row data original", row.original);
          navigate("/employee-register", { state: row.original });
  
          // console.log("clicked", imageUrl);
        },
        sx: {
          textDecoration: "none",
        },
      }),
      renderTopToolbarCustomActions: ({ table }) => (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
            alignItems:'center',
          }}
        >
          <Typography>Employee List</Typography>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
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
      );    
}

export default EmployeeInActiveList