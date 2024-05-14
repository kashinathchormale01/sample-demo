import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import {Button, Stack,CircularProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from '@mui/material';
import axios from "axios";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { toast } from "react-toastify";
import ConfirmBox from "../../../global/common/confirmDialog/ConfirmDialog";
import moment from "moment/moment";

const SiteLocationManagement = (props) => {
    const [sitelocations, setSitelocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    // const [siteId, setSiteId] = useState();
    const [open, setOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const navigate = useNavigate();
  
      const loadSiteLocation = async () => {      
        try {
          let result = await axios.get('/GetProj_Site');
          setSitelocations(result.data.data);          
          setLoading(false);
          // Work with the response...
      } catch (err) {
          if (err.response) {
            setLoading(false);
            console.log('Status', err.response.status);
            setError(err.message);
              // The client was given an error response (5xx, 4xx)
              console.log('Error response', err.message);
          } else if (err.request) {
            setLoading(false);
            setError(err.message);
              // The client never received a response, and the request was never left
              console.log('Error Request', err.message);
          } else {
              // Anything else
              setLoading(false);
              setError(err.message);
              console.log('Error anything', err.message);
          }
      }
        
      };

      useEffect(() => {
        loadSiteLocation();
      }, []);

      const deleteSiteLocation = async () => {
        await axios.delete(
          `/DeleteProj_Site/${deleteData?.Id}`
        ).then(res=>{
          toast.error(res.data.msg);
          loadSiteLocation();
          setOpen(false);
        }); 
      };

      function openDelete(data) {
        setOpen(true);
        setDeleteData(data);
      }

      console.log(deleteData);

  if (loading) return <>Loading...<CircularProgress /></>;
  if (error) return <p>Error: {error}</p>;
  if (!sitelocations.length) return <> <Button
  variant="contained"
  color="primary"
  startIcon={<AddLocationIcon />}
  onClick={() => navigate('/add-site-location')} 
>    
Add New Site Location
</Button> <p>No Site Locations!</p></>

  return (
    <>
     <Button
                variant="contained"
                color="primary"
                startIcon={<AddLocationIcon />}
                onClick={() => navigate('/add-site-location')} 
              >    
    Add New Site Location
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
            <TableCell>Site Id</TableCell>
            <TableCell>Site Name</TableCell>
            <TableCell>Site Area</TableCell>
            <TableCell>Creation Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sitelocations.map((site, index) => (
            <TableRow key={site.siteName}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {site.Id}
              </TableCell>
              <TableCell>{site.siteName}</TableCell>
              <TableCell>{site.siteArea}</TableCell>
              <TableCell>{moment(site.creationDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
              <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<EditLocationAltIcon />}
                onClick={() => navigate(`/edit-site-location/${site.Id}`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<WrongLocationIcon />}
                onClick={() => openDelete(site)}
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
        title={deleteData?.siteName}
        deleteFunction={deleteSiteLocation}
      />  
    </>
  )
}

export default SiteLocationManagement