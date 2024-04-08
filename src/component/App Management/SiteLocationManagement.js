import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import {Link, Button, Stack,CircularProgress } from '@mui/material';
import axios from "axios";
import ConfirmationDialog from "../../global/common/ConfirmationDialog";
import SiteDatagrid from "./SiteDatagrid";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { toast } from "react-toastify";
// import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "Id", headerName: "Site Name", flex: 1 },
  { field: "siteName", headerName: "Site Name", flex: 1 },
  { field: "siteArea", headerName: "Area Name", flex: 1 },
  { field: "creationDate", headerName: "Creation Date", flex: 1 },
  { field: "Action", headerName: "Action", flex: 1 },  
];

const SiteLocationManagement = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
    const [sitelocations, setSitelocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [siteId, setSiteId] = useState();
    const navigate = useNavigate();
    const { data, rowSelected, setRowSelected, animate } = props;
  const selectionModel = rowSelected;

  const handleRowSelection = (e) => {
    setRowSelected(e);
    console.log(e);
  };
    
    

    const deleteSiteLocation = async (id) => {
        setSiteId(id);
        const selectedSite = {"Id": id}        
        console.log(JSON.stringify(selectedSite))
        await axios.delete(
          `http://192.168.1.121:8089/api/DeleteProj_Site/`+id
        ).then(res=>{
          toast.success(res.data.msg);
        }); 
        loadSiteLocation();
      };

      const loadSiteLocation = async () => {      
        try {
          let result = await axios.get('http://192.168.1.121:8089/api/GetProj_Site');
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

      const handleConfirmation = (id) => {
        // Perform action upon confirmation
        console.log('Confirmed!');
        alert('Confirmed')
        deleteSiteLocation(id);
      };

      useEffect(() => {
        loadSiteLocation();
      }, []);

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
    
    <div className="home-page">
      <table className="table" style={{width:'100%'}}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Site Name</th>
            <th scope="col">Area Name</th>
            <th scope="col">Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sitelocations.map((site, index) => (
           // console.log(site.Id)
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{site.siteName}</td>
              <td>{site.siteArea}</td>
              <td>{site.creationDate}</td>
              {/* <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/site/${site.Id}`)}
              >
                <PreviewIcon />
              </Button> 
               <Link class="btn btn-outline-primary mr-2" to={`./edituser/${user.id}`}>Edit</Link> */}
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
                onClick={() => deleteSiteLocation(site.Id)}
              >
                Delete
              </Button>
              </Stack>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <SiteDatagrid />
    <div>
  
    <ConfirmationDialog
      title="Confirmation"
      description="Are you sure you want to proceed?"
      response={handleConfirmation}
    >
      {(showDialog) => (
        <button onClick={showDialog}>Open Confirmation Dialog</button>
      )}
    </ConfirmationDialog>
</div>
    </>
  )
}

export default SiteLocationManagement