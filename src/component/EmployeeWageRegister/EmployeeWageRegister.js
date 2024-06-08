import React from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from "material-react-table";
import { Box, Button, Link } from "@mui/material";
import { fakeData } from "./makeData";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";

const Example = () => {
  const handleExportRows = (rows) => {
    
    const doc = new jsPDF("landscape");
    const title = "Wage Breakup";
    doc.text(title, 15, 15);
    const tableData = rows.map((row) => Object.values(row._valuesCache));
    const roundedTableData = tableData.map(row =>
      row.map(value => typeof value === 'number' ? Math.round(value) : value)
    );
    const tableHeaders = columns.map((c) => c.header);
    //console.log(roundedTableData);
    //console.log(tableHeaders);

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
        accessorKey: "id",
        header: "Id",
        size: 50,
      },
      {
        id: "fullname",
        header: "Full Name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        //Add a link in a cell render
        Cell: ({ renderedCellValue, row }) => (
          <Link to={`/profile/${row.id}`}>{renderedCellValue}</Link>
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
      // {
      //   accessorKey: "overtimeHrs",
      //   header: "Overtime Hours",
      // },
      // {
      //   accessorKey: "basicWage",
      //   header: "Basic Wage",
      // },
      {
        accessorKey: "specialBasic",
        header: "Special Basic",
      },
      // {
      //   accessorKey: "wageDA",
      //   header: "DA",
      // },
      {
        id: "totalWage",
        header: "Total Wage",
        accessorFn: (row) => row.noOfDayswork * (row.basicWage + row.wageDA),
        Cell: ({ renderedCellValue, row }) => {
          return <>{renderedCellValue}</>;
        },
      },
      // {
      //   accessorKey: "paymentovertime",
      //   header: "Payment Overtime",
      // },
      {
        accessorKey: "HRA",
        header: "HRA",
      },
      {
        accessorKey: "otherSpecialAllows",
        header: "Other Special Allows",
      },
      {
        id: "grandTotal",
        header: "Grand Total",
        accessorFn: (row) => row.wageRate * row.noOfDayswork,
        Cell: ({ renderedCellValue }) => {
          return <span>{renderedCellValue}</span>;
        },
      },
      {
        id: "deductPf",
        header: "PF",
        accessorFn: (row) =>
          ((row.noOfDayswork * (row.basicWage + row.wageDA)) / 100) * 12,
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
      {
        id: "deductESIC",
        header: "ESIC",
        accessorFn: (row) => (row.wageRate * row.noOfDayswork * 0.75) / 100,
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
      // {
      //   accessorKey: "deductSociety",
      //   header: "Society",
      // },
      {
        accessorKey: "deductPT",
        header: "Proffessional Tax",
      },
      // {
      //   accessorKey: "deductInsurance",
      //   header: "Insurance",
      // },
      // {
      //   accessorKey: "deductOthers",
      //   header: "Others",
      // },
      // {
      //   accessorKey: "deductRecoveries",
      //   header: "Recoveries",
      // },
      {
        id: "totalDeduction",
        header: "Total Deduction",
        accessorFn: (row) =>
          ((row.noOfDayswork * (row.basicWage + row.wageDA)) / 100) * 12 +
          (row.wageRate * row.noOfDayswork * 0.75) / 100 +
          (row.deductSociety +
            row.deductPT +
            row.deductInsurance +
            row.deductOthers +
            row.deductRecoveries),
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
      {
        id: "netPayment",
        header: "Net Payment",
        accessorFn: (row) =>
          row.wageRate * row.noOfDayswork -
          (((row.noOfDayswork * (row.basicWage + row.wageDA)) / 100) * 12 +
            (row.wageRate * row.noOfDayswork * 0.75) / 100 +
            row.deductSociety +
            row.deductPT +
            row.deductInsurance +
            row.deductOthers +
            row.deductRecoveries),
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
      {
        id: "pfEmployer",
        header: "PF By Employer",
        accessorFn: (row) =>
          (row.noOfDayswork * (row.basicWage + row.wageDA) * 13.15) / 100,
        Cell: ({ renderedCellValue }) => {
          return <span>{Math.round(renderedCellValue)}</span>;
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: fakeData,
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

  return <MaterialReactTable table={table} />;
};

export default Example;
