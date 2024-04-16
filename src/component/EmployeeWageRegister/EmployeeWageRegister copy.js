import React from 'react';
import { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
  } from 'material-react-table';
  import {
    Typography,
  } from '@mui/material';
  import {
    QueryClient,
    QueryClientProvider,
     useQuery,
  } from '@tanstack/react-query';
  import { fakeData } from './makeData';
  import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

const Example = () => {
    // const [validationErrors, setValidationErrors] = useState({});
    const handleExportRows = (rows) => {
      const doc = new jsPDF();
      const tableData = rows.map((row) => Object.values(row.original));
      const tableHeaders = columns.map((c) => c.header);
  
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
            enableEditing: false,
            size: 80,
          },
          {
            header: "Full Name",
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              return (
                <span>
                  {row.firstName} {row.lastName}
                </span>
              );
            }
          },
          {
            accessorKey: 'wageRate',
            header: 'Wage Rate',
            enableEditing: false,
          },
          {
            accessorKey: 'noOfDayswork',
            header: 'No Of Days Work',
            enableEditing: false,
          },
          {
            accessorKey: 'overtimeHrs',
            header: 'Overtime Hours',
          },
          {
            accessorKey: 'basicWage',
            header: 'Basic Wage',
            enableEditing: false,
          },
          {
            accessorKey: 'specialBasic',
            header: 'Special Basic',
            enableEditing: false,
          },
          {
            accessorKey: 'wageDA',
            header: 'DA',
            enableEditing: false,
          },
          {
            accessorKey: 'totalWage',
            header: 'Total Wage',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const totalEarning = (row.noOfDayswork * (row.basicWage + row.wageDA));
              //setTotalEarning(totalEarning);              
              return (
                <span>
                  {totalEarning}
                </span>
              );
            },
            enableEditing: false,
          },
          {
            accessorKey: 'paymentovertime',
            header: 'Payment Overtime',
            enableEditing: false,
          },
          {
            accessorKey: 'HRA',
            header: 'HRA',
            enableEditing: false,
          },
          {
            accessorKey: 'otherSpecialAllows',
            header: 'Other Special Allows',
            enableEditing: false,
          },
          {
            accessorKey: 'grandTotal',
            header: 'Grand Total',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const grandTotalearn = row.wageRate * row.noOfDayswork;
             // setGrandTotalEarning(grandTotalearn);
              return (
                <span>
                  {grandTotalearn}
                </span>
              );
            }
          },
          {
            accessorKey: 'deductPf',
            header: 'PF',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const totalEarning = (row.noOfDayswork * (row.basicWage + row.wageDA));
              const pfDeduct = (totalEarning*12)/100;
              //setPfDeduction(pf);
              return (
                <span>
                  {pfDeduct}
                </span>
              );
            }
          },
          {
            accessorKey: 'deductESIC',
            header: 'ESIC',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const grandTotalearn = row.wageRate * row.noOfDayswork;
              const esicDeduct = (grandTotalearn*0.75)/100;
              //setPfDeduction(pf);
              return (
                <span>
                  {esicDeduct}
                </span>
              );
            }          
          },
          {
            accessorKey: 'deductSociety',
            header: 'Society',
            enableEditing: false,
          },
          {
            accessorKey: 'deductPT',
            header: 'Proffessional Tax',
            enableEditing: false,
          },
          {
            accessorKey: 'deductInsurance',
            header: 'Insurance',
            enableEditing: false,
          },
          {
            accessorKey: 'deductOthers',
            header: 'Others',
            enableEditing: false,
          },
          {
            accessorKey: 'deductRecoveries',
            header: 'Recoveries',
            enableEditing: false,
          },
          {
            accessorKey: 'totalDeduction',
            header: 'Total Deduction',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const totalEarning = (row.noOfDayswork * (row.basicWage + row.wageDA));
              const pfDeduct1 = (totalEarning*12)/100;
              const grandTotalearn = row.wageRate * row.noOfDayswork;
              const esicDeduct = (grandTotalearn*0.75)/100;
              return (
                <span>
                  {pfDeduct1 + esicDeduct + (row.deductSociety + row.deductPT + row.deductInsurance + row.deductOthers + row.deductRecoveries)}
                </span>
              );
            }
          },
          {
            accessorKey: 'netPayment',
            header: 'Net Payment',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const grandTotalearn = row.wageRate * row.noOfDayswork;
              const totalEarning = (row.noOfDayswork * (row.basicWage + row.wageDA));
              const pfDeduct = (totalEarning*12)/100;
              const esicDeduct = (grandTotalearn*0.75)/100;

              return (
                <span>
                  {grandTotalearn - (pfDeduct + esicDeduct + row.deductSociety + row.deductPT + row.deductInsurance + row.deductOthers + row.deductRecoveries)}
                </span>
              );
            }
          },
          {
            accessorKey: 'pfEmployer',
            header: 'PF by Employer',
            accessorFn: (row) => row,
            Cell: ({ cell }) => {
              const row = cell.getValue();
              const totalEarning = (row.noOfDayswork * (row.basicWage + row.wageDA));
              const pfByEmployer = (totalEarning*13.15)/100;
              return (
                <span>
                 {pfByEmployer}
                </span>
              );
            }
          },
        ],
        [],
      );
      //call CREATE hook
 
//call READ hook
const {
  data: fetchedWages = [],
  isError: isLoadingUsersError,
  isFetching: isFetchingUsers,
  isLoading: isLoadingUsers,
} = useGetWages();
//call UPDATE hook


const table = useMaterialReactTable({
    columns,
    data: fetchedWages,
    enableEditing: false,
    getRowId: (row) => row.id,
    enableGrouping: true,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    
    
    //optionally customize modal content
    
  
    renderTopToolbarCustomActions: ({ table }) => (
  
    <Typography variant='h4'>Wage Register</Typography>
    ),
    
  });

  return <MaterialReactTable table={table} />;
};
 //CREATE hook (post new user to api)

//READ hook (get users from api)
function useGetWages() {
    return useQuery({
      queryKey: ['wage'],
      queryFn: async () => {
        //send api request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return Promise.resolve(fakeData);
      },
      refetchOnWindowFocus: false,
    });
  }
  

  
 
  const queryClient = new QueryClient();
  
  const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );

export default ExampleWithProviders;
