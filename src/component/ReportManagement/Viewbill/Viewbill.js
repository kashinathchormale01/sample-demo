import React, { Fragment, useState, useEffect, useMemo } from "react";
import axiosHttp from "../../../AxiosInstance";
import { Typography, Box, Button } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import moment from "moment";
import { pdf} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import Invoice from '../../../global/common/Reports/Invoice';
import { useNavigate } from "react-router-dom";

const Viewbill = () => {
  const navigate = useNavigate();
  const [billList, setBillList] = useState([]);
  const [wageslipData, setWageslipData] = useState([]);
  const [wageRegisterData, setWageRegisterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    loadBilldata();
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

    doc.save('BillList.pdf');
  };

  const handleWageSlip = async(billId) => {
       
    console.log(`Wage Slip clicked for billId ${billId}`);
    try {
      let result = await axiosHttp.get(`/GetBill/${billId}`);
      setWageslipData(result.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
    console.log('wageslipData',wageslipData) ;

   
      // const blob = await pdf(<Invoice invoice={invoice}/>).toBlob()
      // saveAs(blob, 'wageslip.pdf')
   
  };

  const handleWageRegister = async(billId) => {
    console.log(`Wage Register clicked for billId ${billId}`);
    try {
      let result = await axiosHttp.get(`/GetBill/${billId}`);
      setWageRegisterData(result.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
    console.log('wageregisterData',wageRegisterData)
    navigate("/generate-wage-reports", { state: billId.original });
  };

  //console.log(`Wage Register clicked for billId ${billId}`);

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
        accessorFn: (row) => moment(row.fromdate).format('DD/MM/YYYY'),
        size: 50,
      },
      {
        accessorKey: "todate",
        header: "To Date",
        accessorFn: (row) => moment(row.todate).format('DD/MM/YYYY'),
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
        id: "actions",
        header: "Actions",
        accessorFn: (row) => ``,
        Cell: ({ row }) => {
          return(<Box state={{ id:row.original }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleWageSlip(row.original.billid)}
              style={{ marginRight: 10 }}
            >
              Wage Slip
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleWageRegister(row.original.billid)}
            >
              Wage Register
            </Button>
          </Box>)                 
        },
      },
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
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
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
  if (!billList.length) return <Typography color="error">No Bill available!</Typography>;

  return (
    <MaterialReactTable table={table} />
  );
};

export default Viewbill;