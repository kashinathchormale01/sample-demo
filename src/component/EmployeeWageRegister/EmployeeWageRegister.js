import React from 'react';
import { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
  } from 'material-react-table';
  import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography,
  } from '@mui/material';
  import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
  } from '@tanstack/react-query';
  import { fakeData } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const columns = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 80,
          },
          {
            accessorKey: 'firstName',
            header: 'First Name',
            muiEditTextFieldProps: {
              required: true,
              error: !!validationErrors?.firstName,
              helperText: validationErrors?.firstName,
              //remove any previous validation errors when user focuses on the input
              onFocus: () =>
                setValidationErrors({
                  ...validationErrors,
                  firstName: undefined,
                }),
              //optionally add validation checking for onBlur or onChange
            },
          },
          {
            accessorKey: 'lastName',
            header: 'Last Name',
            muiEditTextFieldProps: {
              required: true,
              error: !!validationErrors?.lastName,
              helperText: validationErrors?.lastName,
              //remove any previous validation errors when user focuses on the input
              onFocus: () =>
                setValidationErrors({
                  ...validationErrors,
                  lastName: undefined,
                }),
            },
          },
          {
            accessorKey: 'wageRate',
            header: 'Wage Rate',
            muiEditTextFieldProps: {            
              required: true,
              error: !!validationErrors?.wageRate,
              helperText: validationErrors?.wageRate,
              //remove any previous validation errors when user focuses on the input
              onFocus: () =>
                setValidationErrors({
                  ...validationErrors,
                  wageRate: undefined,
                }),
            },
          },
          {
            accessorKey: 'noOfDayswork',
            header: 'No Of Days Work',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.noOfDayswork,
                helperText: validationErrors?.noOfDayswork,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    noOfDayswork: undefined,
                  }),
              },
          },
          {
            accessorKey: 'overtimeHrs',
            header: 'Overtime Hours',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.overtimeHrs,
                helperText: validationErrors?.overtimeHrs,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    overtimeHrs: undefined,
                  }),
              },
          },
          {
            accessorKey: 'basicWage',
            header: 'Basic Wage',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.basicWage,
                helperText: validationErrors?.basicWage,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    basicWage: undefined,
                  }),
              },
          },
          {
            accessorKey: 'specialBasic',
            header: 'Special Basic',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.specialBasic,
                helperText: validationErrors?.specialBasic,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    specialBasic: undefined,
                  }),
              },
          },
          {
            accessorKey: 'wageDA',
            header: 'DA',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.wageDA,
                helperText: validationErrors?.wageDA,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    wageDA: undefined,
                  }),
              },
          },
          {
            accessorKey: 'totalWage',
            header: 'Total Wage',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.totalWage,
                helperText: validationErrors?.totalWage,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    totalWage: undefined,
                  }),
              },
          },
          {
            accessorKey: 'paymentovertime',
            header: 'Payment Overtime',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.paymentovertime,
                helperText: validationErrors?.paymentovertime,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    paymentovertime: undefined,
                  }),
              },
          },
          {
            accessorKey: 'HRA',
            header: 'HRA',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.HRA,
                helperText: validationErrors?.HRA,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    HRA: undefined,
                  }),
              },
          },
          {
            accessorKey: 'otherSpecialAllows',
            header: 'Other Special Allows',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.otherSpecialAllows,
                helperText: validationErrors?.otherSpecialAllows,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    otherSpecialAllows: undefined,
                  }),
              },
          },
          {
            accessorKey: 'grandTotal',
            header: 'Grand Total',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.grandTotal,
                helperText: validationErrors?.grandTotal,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    grandTotal: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductPf',
            header: 'PF',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductPf,
                helperText: validationErrors?.deductPf,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductPf: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductESIC',
            header: 'ESIC',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductESIC,
                helperText: validationErrors?.deductESIC,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductESIC: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductSociety',
            header: 'Society',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductSociety,
                helperText: validationErrors?.deductSociety,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductSociety: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductPT',
            header: 'Proffessional Tax',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductPT,
                helperText: validationErrors?.deductPT,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductPT: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductInsurance',
            header: 'Insurance',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductInsurance,
                helperText: validationErrors?.deductInsurance,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductInsurance: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductOthers',
            header: 'Others',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductOthers,
                helperText: validationErrors?.deductOthers,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductOthers: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductPf',
            header: 'PF',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductPf,
                helperText: validationErrors?.deductPf,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductPf: undefined,
                  }),
              },
          },
          {
            accessorKey: 'deductPf',
            header: 'PF',
            muiEditTextFieldProps: {            
                required: true,
                error: !!validationErrors?.deductPf,
                helperText: validationErrors?.deductPf,
                //remove any previous validation errors when user focuses on the input
                onFocus: () =>
                  setValidationErrors({
                    ...validationErrors,
                    deductPf: undefined,
                  }),
              },
          },
        ],
        [validationErrors],
      );
      //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
  useCreateUser();
//call READ hook
const {
  data: fetchedUsers = [],
  isError: isLoadingUsersError,
  isFetching: isFetchingUsers,
  isLoading: isLoadingUsers,
} = useGetUsers();
//call UPDATE hook
const { mutateAsync: updateUser, isPending: isUpdatingUser } =
  useUpdateUser();
//call DELETE hook
const { mutateAsync: deleteUser, isPending: isDeletingUser } =
  useDeleteUser();

//CREATE action
const handleCreateUser = async ({ values, table }) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await createUser(values);
  table.setCreatingRow(null); //exit creating mode
};

//UPDATE action
const handleSaveUser = async ({ values, table }) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await updateUser(values);
  table.setEditingRow(null); //exit editing mode
};

//DELETE action
const openDeleteConfirmModal = (row) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    deleteUser(row.original.id);
  }
};

const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
    //   <Button
    //     variant="contained"
    //     onClick={() => {
    //       table.setCreatingRow(true); //simplest way to open the create row modal with no default values
    //       //or you can pass in a row object to set default values with the `createRow` helper function
    //       // table.setCreatingRow(
    //       //   createRow(table, {
    //       //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
    //       //   }),
    //       // );
    //     }}
    //   >
    //     Create New User
    //   </Button>
    <Typography variant='h4'>Wage Register</Typography>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};
 //CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(['users'], (prevUsers) => [
          ...prevUsers,
          {
            ...newUserInfo,
            id: (Math.random() + 1).toString(36).substring(7),
          },
        ]);
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
//READ hook (get users from api)
function useGetUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        //send api request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve(fakeData);
      },
      refetchOnWindowFocus: false,
    });
  }
  
  //UPDATE hook (put user in api)
  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(['users'], (prevUsers) =>
          prevUsers?.map((prevUser) =>
            prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
          ),
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  
  //DELETE hook (delete user in api)
  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (userId) => {
        queryClient.setQueryData(['users'], (prevUsers) =>
          prevUsers?.filter((user) => user.id !== userId),
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
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

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}