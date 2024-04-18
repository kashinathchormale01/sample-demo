import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import {Button, Stack,CircularProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@mui/material';
import axios from "axios";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { toast } from "react-toastify";
import ConfirmBox from "../../../global/common/confirmDialog/ConfirmDialog";

const DesignationManagement = () => {
    const [designationlist, setDesignationlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false);
    const [deleteDesignationData, setDeleteDesignationData] = useState({});
    const navigate = useNavigate();
  
      const loadDesignations = async () => {      
        try {
          let result = await axios.get('/GetRole');
        setDesignationlist(result.data.data);          
          setLoading(false);
          // Work with the response...
      } catch (err) {
          if (err.response) {
            setLoading(false);
          //  console.log('Status', err.response.status);
            setError(err.message);
              // The client was given an error response (5xx, 4xx)
              console.log('Error response', err.message);
          } else if (err.request) {
            setLoading(false);
            setError(err.message);
              // The client never received a response, and the request was never left
            //  console.log('Error Request', err.message);
          } else {
              // Anything else
              setLoading(false);
              setError(err.message);
             // console.log('Error anything', err.message);
          }
      }
        
      };

      useEffect(() => {
        loadDesignations();
      }, []);

      const deleteDesignations = async () => {
        await axios.delete(
          `/DeleteProj_Site/${deleteDesignationData?.Id}`
        ).then(res=>{
          toast.error(res.data.msg);
          loadDesignations();
          setOpen(false);
        }); 
      };

      function openDelete(data) {
        setOpen(true);
        setDeleteDesignationData(data);
      }

     
  if (loading) return <>Loading...<CircularProgress /></>;
  if (error) return <p>Error: {error}</p>;
  if (!designationlist.length) return <> <Button
  variant="contained"
  color="primary"
  startIcon={<ManageAccountsIcon />}
  onClick={() => navigate('/add-designation')} 
>    
Add New Designation/Role
</Button> <p>No Designation available!</p></>

  return (
    <>
     <Button
                variant="contained"
                color="primary"
                startIcon={<ManageAccountsIcon />}
                onClick={() => navigate('/add-designation')} 
              >    
    Add New Designation/Role
    </Button>  
    <TableContainer sx={{ maxWidth: '50%', marginTop:'20px' }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontSize: "1rem",
                color: "rgba(96, 96, 96)",
                backgroundColor: "#b1dbdf"
              }
            }}
          >
            <TableCell>Sr.No</TableCell>
            <TableCell>Role Id</TableCell>
            <TableCell>Role/Designation Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {designationlist.map((item, index) => (
            <TableRow key={item.RoleName}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item.Id}
              </TableCell>
              <TableCell>{item.RoleName}</TableCell>             
              <TableCell>
              <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<ManageAccountsIcon />}
                onClick={() => navigate(`/edit-designation/${item.Id}`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<ManageAccountsIcon />}
                onClick={() => openDelete(item)}
              >
                Delete
              </Button>
              </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

{/* Confirmation dialog functionality */}
    <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={deleteDesignationData?.RoleName}
        deleteFunction={deleteDesignations}
      />  
    </>
  )
}

export default DesignationManagement