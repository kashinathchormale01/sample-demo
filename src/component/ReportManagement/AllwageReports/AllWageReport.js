import React, { Fragment, useState, useEffect, useMemo } from "react";
import axiosHttp from "../../../AxiosInstance";
import { Typography, Box, Button,CircularProgress } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { pdf} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
 import Invoice from '../../../global/common/Reports/Invoice';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

const AllWageReport = () => {
  const [billList, setBillList] = useState([]);
  const [wageslipData, setWageslipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBilldata = async () => {
    try {
      let result = await axiosHttp.get('/GetBill');
      setBillList(result.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    loadBilldata();
  }, []);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const title = "Bill List";
    doc.text(title, 15, 10);
    const tableData = rows?.map((row) => Object.values(row._valuesCache));
    const tableHeaders = columns?.map((c) => c.header);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('BillList.pdf');
  };

  const handleWageSlip = async(billId) => {
       
    console.log(`Wage Slip clicked for billId ${billId}`);
    try {
      let result = await axiosHttp.get(`/GetBillSlip/${billId}`);
       setWageslipData(result.data.data);
      //console.log('wageslipData',result.data.data) ;
      setLoading(false);
       const blob = await pdf(<Invoice invoice={result.data.data}/>).toBlob()
       saveAs(blob, 'wageslip.pdf')
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
   
  };
 
  const handleDeletebill = async(billId) =>{
    console.log(`delete clicked for billId ${billId}`);
    if (window.confirm("Are you sure you want to delete this Bill?")) {
    try {
      let result = await axiosHttp.delete(`/DeleteBill/${billId}`);
     //  setWageslipData(result.data.data);
     toast.error(result.data.msg);
     loadBilldata();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }
  }
 

  const columns = useMemo(
    () => [
      {
        accessorKey: "billid",
        header: "Bill Id",
        size: 50,
      },
      {
        accessorKey: "fromdate",
        header: "From Date",
        accessorFn: (row) => moment(row.fromdate).format('MMMM-YYYY'),
        size: 50,
      },
      {
        accessorKey: "todate",
        header: "To Date",
        accessorFn: (row) => moment(row.todate).format('MMMM-YYYY'),
        size: 50,
      },
      {
        accessorKey: "totalemp",
        header: "Total Employees",
        size: 50,
      },
      {
        accessorKey: "Total Sites",
        header: "Total Sites",
      },
      {
        id: "reports",
        header: "Reports",
        accessorFn: (row) => ``,
        Cell: ({ row }) => {
          return(<Box state={{ id:row.original }}>           
            <Link style={{color:'#1976d2'}} to={{pathname:`/generate-wage-reports`}} state={{ id:row.original.billid }}>WageRegister</Link>
          </Box>)                 
        },
      }
    ],
    []
  );
 
  const table = useMaterialReactTable({
    columns,
    data: billList,
    enableEditing: false,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => {
      const isLastPage = table.getState().pagination.pageIndex === table.getPageCount() - 1;
      return(
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
        {isLastPage && (
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          )}
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
    )},
  });

  if (error) return `Error: ${error.message}`;
  if (loading) return <div className="overlay"><div className="loadingicon"><CircularProgress color="inherit" /><br/>Loading...</div></div>;
  if (!billList.length) return <Typography color="error">No Bill available!</Typography>;
  
  return (
    <>
      <marquee
        style={{ color: "red", fontSize: "12pt" }}
      >
        If you delete any bill, then it may impact employee reports, you may also
        loose important data related to the that employee.
      </marquee>
      <MaterialReactTable table={table} />
    </>
  );
};

export default AllWageReport;
