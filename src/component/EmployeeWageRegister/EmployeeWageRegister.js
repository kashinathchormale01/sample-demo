import React,{useEffect,useState} from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from "material-react-table";
import { Box, Button, Link,Typography } from "@mui/material";
import { fakeData } from "./makeData";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { useLocation } from "react-router-dom";
import axiosHttp from "../../AxiosInstance";

const Example = () => {
 // let fakeData;
 let array;
 let array1 = null;
  const location = useLocation();
 // console.log('location data',location.state.id);
  const [loading, setLoading] = useState(true);
  const [wageData, setWageData] = useState();

  useEffect(() => {
   // console.log('in useffect',location.state.id)

    if (location.state?.id) {   
      console.log('in if useffect',location.state.id)
     // setLoading(true);
      axiosHttp.get(`/GetBill/${location.state?.id}`)
        .then(response => {
          //setSelectedEmp(response.data.data[0]);
         //fakeData = response.data
         setWageData(response.data.data)
        // console.log('response',response.data.data)
         array = response.data.data;
        //  setLoading(false);
        })
        .catch(error => {
         // setLoading(false);
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  //console.log('after useffect',array)

  const handleExportRows = (rows) => {
    
    const doc = new jsPDF("landscape");
    const title = "Wage Breakup";
    doc.text(title, 15, 15);
    const tableData = rows.map((row) => Object.values(row._valuesCache));
    const roundedTableData = tableData.map(row =>
      row.map(value => typeof value === 'number' ? Math.round(value) : value)
    );
    const tableHeaders = columns.map((c) => c.header);
    

    doc.autoTable({
      html: "#table",
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 200 },
        2: { cellWidth: 80 },
        3: { cellWidth: 100 },
        4: { cellWidth: 80 },
        5: { cellWidth: 80 },
        6: { cellWidth: 100 },
        7: { cellWidth: 80 },
        8: { cellWidth: 80 },
        9: { cellWidth: 100 },
        10: { cellWidth: 80 },
        11: { cellWidth: 80 },
        12: { cellWidth: 100 },
        13: { cellWidth: 80 },
        14: { cellWidth: 80 },
        // etc
      },
    });

    autoTable(doc, {
      showHead: "everyPage", 
      head: [tableHeaders],
      body: roundedTableData,
    });

    doc.save("Wage-Slip-All.pdf");
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "EmpId",
        header: "Id",
        size: 50,
      },
      {
        id: "fullname",
        header: "Full Name",
        accessorFn: (row) => `${row?.firstName} ${row?.lastName}`,
        //Add a link in a cell render
        Cell: ({ renderedCellValue, row }) => (
          <Link to={`/profile/${row?.id}`}>{renderedCellValue}</Link>
        ),
      },
      {
        accessorKey: "wageRate",
        header: "Wage Rate",
        size: 50,
      },
      {
        accessorKey: "noOfDayswork",
        header: "No Of Days Work",
      },
      {
        accessorKey: "overtimeHrs",
        header: "Overtime Hours",
      },
      {
        accessorKey: "basicWage",
        header: "Basic Wage",
      },
      {
        accessorKey: "specialBasic",
        header: "Special Basic",
      },
      {
        accessorKey: "wageDA",
        header: "DA",
      },
      {
        accessorKey: "totalWage",
        header: "Total Wage",
      },
      {
        accessorKey: "paymentovertime",
        header: "Payment Overtime",
      },
      {
        accessorKey: "HRA",
        header: "HRA",
      },
      {
        accessorKey: "otherSpecialAllows",
        header: "Other Special Allows",
      },
      {
        accessorKey: "grandTotal",
        header: "Grand Total",
      },
      {
        accessorKey: "deductPf",
        header: "PF",
      },
      {
        accessorKey: "deductESIC",
        header: "ESIC",
      },
      {
        accessorKey: "deductSociety",
        header: "Society",
      },
      {
        accessorKey: "deductPT",
        header: "Proffessional Tax",
      },
      {
        accessorKey: "deductInsurance",
        header: "Insurance",
      },
      {
        accessorKey: "deductOthers",
        header: "Others",
      },
      {
        accessorKey: "deductRecoveries",
        header: "Recoveries",
      },
      {
        accessorKey: "totalDeduction",
        header: "Total Deduction",
      },
      {
        id: "netPayment",
        header: "Net Payment",
        accessorFn: (row) =>
         (row.grandTotal - row.totalDeduction),
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
      {
        id: "pfEmployer",
        header: "PF By Employer",
        accessorFn: (row) =>
          (row.totalWage * 13.15) / 100,
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: wageData? wageData:[],
    enableRowSelection: true,
    enableEditing: false,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    //optionally customize modal content
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
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

  if (!location.state) return <Typography color="error">No Data available!</Typography>;

  return <MaterialReactTable table={table} />;
};

export default Example;
