import React, { Fragment, useState, useEffect, useMemo } from "react";
import axiosHttp from "../../../AxiosInstance";
import { Typography, Box, Button } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Link, useNavigate } from "react-router-dom";

const PFValidationReport = () => {
    // const navigate = useNavigate();

    const pfvalidationlist= [{
        srNo:1,
        UANno:1012,
        ESIC:54544,
        PFNo:98565,
        firstName:"Kashinath",
        lastName:"Chormale",
        noOfDayswork:21,
        dateofsalary:"01/01/2001",
        Basic:419,
        deductPf:50,
        grossSalary:10000
      },
      {
        srNo:2,
        UANno:6568,
        ESIC:9894,
        PFNo:25454,
        firstName:"Shyam",
        lastName:"Madhav",
        noOfDayswork:30,
        dateofsalary:"01/01/2001",
        Basic:381,
        deductPf:46,
        grossSalary:8000
      }]

      
  const [pfholderEmpList, setPfholderEmpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('pfholderEmpList',pfholderEmpList)
  const loadPfdata = async () => {
    try {
      let result = await axiosHttp.get('/GetBill');
      setPfholderEmpList(result.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  useEffect(() => {    
    loadPfdata();
  }, []);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const title = "Bill List";
    doc.text(title, 15, 10);
    const tableData = rows.map((row) => Object.values(row._valuesCache));
    const tableHeaders = columns.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('EmpPFholderList.pdf');
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "srNo",
        header: "SR.No.",
        size: 50,
      },
      {
        accessorKey: "UANno",
        header: "UAN No.",
        size: 50,
      },
      {
        accessorKey: "ESIC",
        header: "ESIC  NO.",
        size: 50,
      },
      {
        accessorKey: "PFNo",
        header: "PF No.",
        size: 50,
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
        accessorKey: "noOfDayswork",
        header: "Number Of Days Worked",
        size: 50,
      },
      {
        accessorKey: "dateofsalary",
        header: "Date of Salary",
        size: 50,
      },
      {
        accessorKey: "Basic",
        header: "Basic Wages",
        size: 50,
      },
      {
        accessorKey: "deductPf",
        header: "Employee PF",
      },
      {
        accessorKey: "grossSalary",
        header: "Gross Salary",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: pfvalidationlist,
    enableEditing: false,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
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
        <Typography>Bill List</Typography>
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
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  if (error) return `Error: ${error.message}`;
  if (!pfholderEmpList.length) return <Typography color="error">No PF Employees available!</Typography>;

  return (
    <MaterialReactTable table={table} />
  );
}

export default PFValidationReport