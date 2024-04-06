import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import {Link, Button} from '@mui/material';
import axios from "axios";
import ConfirmationDialog from "../../global/common/ConfirmationDialog";
import SiteDatagrid from "./SiteDatagrid";
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
    const [siteId, setSiteId] = useState();
    const { data, rowSelected, setRowSelected, animate } = props;
  const selectionModel = rowSelected;

  const handleRowSelection = (e) => {
    setRowSelected(e);
    console.log(e);
  };
    
    const navigate = useNavigate();

   

      const deleteSiteLocation = async (id) => {
        setSiteId(id);
        const selectedSite = {"Id": id}        
        console.log(JSON.stringify(selectedSite))
        await axios.delete(
          `http://192.168.1.121:8089/api/DeleteProj_Site/`+id
        );
        loadSiteLocation();
      };

      const loadSiteLocation = async () => {
        const result = await axios.get(
          `http://192.168.1.121:8089/api/GetProj_Site`
        );
        // const result = await axios.get('http://192.168.1.121:8089/api/GetProj_Site')
        // .then(res=>{
        //   console.log(res);
        //   console.log(res.data);
        //   setSitelocations(res.data);
        // })  
         console.log(result)
        setSitelocations(result.data.data);
        console.log(sitelocations)
        
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

  return (
    <>
    <Link color="inherit" onClick={() => navigate('/add-site-location')} style={{ cursor: 'pointer', textTransform:'capitalize' }}>
    Add New Site location
    </Link>
    <div className="home-page">
      <table className="table">
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
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/site/${site.Id}`)}
              >
                View
              </Button>
              {/* <Link class="btn btn-outline-primary mr-2" to={`./edituser/${user.id}`}>Edit</Link> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/editsite/${site.Id}`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteSiteLocation(site.Id)}
              >
                Delete
              </Button>
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