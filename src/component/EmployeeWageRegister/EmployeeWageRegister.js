import React from 'react';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,  
  createMRTColumnHelper
} from 'material-react-table';
import { Box, Button,Link } from '@mui/material';
import { fakeData } from './makeData';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';


const columnHelper = createMRTColumnHelper();
export const data = [
  {
    id: 1,
    firstName: 'Elenora',
    lastName: 'Wilkinson',
    company: 'Feest - Reilly',
    city: 'Hertaland',
    country: 'Qatar',
  },
  {
    id: 2,
    firstName: 'Berneice',
    lastName: 'Feil',
    company: 'Deckow, Leuschke and Jaskolski',
    city: 'Millcreek',
    country: 'Nepal',
  },
  {
    id: 3,
    firstName: 'Frieda',
    lastName: 'Baumbach',
    company: 'Heidenreich, Grady and Durgan',
    city: 'Volkmanside',
    country: 'Croatia',
  },
  {
    id: 4,
    firstName: 'Zachery',
    lastName: 'Brown',
    company: 'Cormier - Skiles',
    city: 'Faychester',
    country: 'Saint Pierre and Miquelon',
  },
  {
    id: 5,
    firstName: 'Kendra',
    lastName: 'Bins',
    company: 'Wehner - Wilderman',
    city: 'New Valentin',
    country: 'Senegal',
  },
  {
    id: 6,
    firstName: 'Lysanne',
    lastName: 'Fisher',
    company: 'Schmidt LLC',
    city: 'Malachitown',
    country: 'Costa Rica',
  },
  {
    id: 7,
    firstName: 'Garrick',
    lastName: 'Ryan',
    company: 'Ryan - Buckridge',
    city: 'East Pearl',
    country: 'Cocos (Keeling) Islands',
  },
  {
    id: 8,
    firstName: 'Hollis',
    lastName: 'Medhurst',
    company: 'Quitzon Group',
    city: 'West Sienna',
    country: 'Papua New Guinea',
  },
  {
    id: 9,
    firstName: 'Arlo',
    lastName: 'Buckridge',
    company: 'Konopelski - Spinka',
    city: 'Chino',
    country: 'Congo',
  },
  {
    id: 10,
    firstName: 'Rickie',
    lastName: 'Auer',
    company: 'Lehner - Walsh',
    city: 'Nyahfield',
    country: 'Sudan',
  },
  {
    id: 11,
    firstName: 'Isidro',
    lastName: 'Larson',
    company: 'Reichert - Paucek',
    city: 'Fort Rosinaside',
    country: 'Belize',
  },
  {
    id: 12,
    firstName: 'Bettie',
    lastName: 'Skiles',
    company: 'Zulauf, Flatley and Rolfson',
    city: 'West Feltonchester',
    country: 'Poland',
  },
]

// const columns = [
//   columnHelper.accessor('id', {
//     header: 'ID',
//     size: 40,
//   }),
//   columnHelper.accessor({
//     header: "Full Name",
//     size:200,
//     accessorFn: (row) => {
//       console.log(row)
//     }
//   }),
//    columnHelper.accessor('firstName', {
//     header: 'First Name',
//     size: 120,
//   }),
//   columnHelper.accessor('lastName', {
//     header: 'Last Name',
//     size: 120,
//   }),
//   columnHelper.accessor('company', {
//     header: 'Company',
//     size: 300,
//   }),
//   columnHelper.accessor('city', {
//     header: 'City',
//   }),
//   columnHelper.accessor('country', {
//     header: 'Country',
//     size: 220,
//   }),
// ];


const Example = () => {
    // const [validationErrors, setValidationErrors] = useState({});
    const handleExportRows = (rows) => {
      const doc = new jsPDF('landscape');
      const tableData = rows.map((row) => Object.keys(row.original));
      const tableHeaders = columns.map((c) => c.header);
      //console.log(tableData);
  
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
  
      doc.save('mrt-pdf-example.pdf');
    };

    const columns = useMemo(
      () => [
        {
          accessorKey: 'id',
          header: 'Id',
          size:50,        
        },
        {
          id: 'fullname',
          header: 'Full Name',
          accessorFn: (row) => `${row.firstName} ${row.lastName}`,         
          //Add a link in a cell render
          Cell: ({ renderedCellValue, row }) => (
            <Link to={`/profile/${row.id}`}>
              {renderedCellValue}
            </Link>
          ),
        },
        {
          accessorKey: 'wageRate',
          header: 'Wage Rate',
          size:50         
        },
        {
          accessorKey: 'noOfDayswork',
          header: 'No Of Days Work',
        },
        {
          accessorKey: 'overtimeHrs',
          header: 'Overtime Hours',
        },
        {
          accessorKey: 'basicWage',
          header: 'Basic Wage',
        },
        {
          accessorKey: 'specialBasic',
          header: 'Special Basic',
        },
        {
          accessorKey: 'wageDA',
          header: 'DA',
        },
        {
          id: 'totalWage',
          header: 'Total Wage',
          accessorFn: (row) => row.noOfDayswork * (row.basicWage + row.wageDA),  
          Cell: ({ renderedCellValue, row }) => {           
            return (<span>
              {renderedCellValue}
              </span>)
          }
        },
        {
          accessorKey: 'paymentovertime',
          header: 'Payment Overtime',
        },
        {
          accessorKey: 'HRA',
          header: 'HRA',
        },
        {
          accessorKey: 'otherSpecialAllows',
          header: 'Other Special Allows',
        },
        {
          id: 'grandTotal',
          header: 'Grand Total',
          accessorFn: (row) => row.wageRate * row.noOfDayswork,  
          Cell: ({ renderedCellValue }) => {           
            return (<span>
              {renderedCellValue}
              </span>)
          }
        },
        {
          id: 'deductPf',
          header: 'PF',
          accessorFn: (row) => (row.noOfDayswork * (row.basicWage + row.wageDA)/100)*12,  
          Cell: ({ renderedCellValue }) => {           
            return (<span>
              {Math.round(renderedCellValue)}
              </span>)
          }
        },
        {
          id: 'deductESIC',
          header: 'ESIC',
          accessorFn: (row) => ((row.wageRate * row.noOfDayswork)*0.75)/100,  
          Cell: ({ renderedCellValue }) => {           
            return (<span>
              {Math.round(renderedCellValue)}
              </span>)
          }
        },
        {
          accessorKey: 'deductSociety',
          header: 'Society',
        },
        {
          accessorKey: 'deductPT',
          header: 'Proffessional Tax',
        },
        {
          accessorKey: 'deductInsurance',
          header: 'Insurance',
        },
        {
          accessorKey: 'deductOthers',
          header: 'Others',
        },
        {
          accessorKey: 'deductRecoveries',
          header: 'Recoveries',
        },
        {
          id: 'totalDeduction',
          header: 'Total Deduction',
          accessorFn: (row) => ((row.noOfDayswork * (row.basicWage + row.wageDA)/100)*12) + 
          (((row.wageRate * row.noOfDayswork)*0.75)/100) + 
          (row.deductSociety + row.deductPT + row.deductInsurance + row.deductOthers + row.deductRecoveries) ,  
          Cell: ({ renderedCellValue }) => {           
            return (<span>
              {Math.round(renderedCellValue)}
              </span>)
          }
        },
        {
          id: 'netPayment',
            header: 'Net Payment',
          accessorFn: (row) => (row.wageRate * row.noOfDayswork) - 
          (((row.noOfDayswork * (row.basicWage + row.wageDA)/100)*12) + (((row.wageRate * row.noOfDayswork)*0.75)/100) + row.deductSociety + row.deductPT + row.deductInsurance + row.deductOthers + row.deductRecoveries),  
          Cell: ({ renderedCellValue }) => {           
            return (<span>
              {Math.round(renderedCellValue)}
              </span>)
          }
        },
        {
          id: 'pfEmployer',
          header: 'PF By Employer',
          accessorFn: (row) => (((row.noOfDayswork * (row.basicWage + row.wageDA))*13.15)/100) ,  
          Cell: ({ renderedCellValue }) => {           
            return (<span>
              {Math.round(renderedCellValue)}
              </span>)
          }
        },
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
    //optionally customize modal content
    
  
    renderTopToolbarCustomActions: ({ table }) => (
  
      <Box
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        flexWrap: 'wrap',
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

  return <MaterialReactTable table={table} />;};

export default Example;
